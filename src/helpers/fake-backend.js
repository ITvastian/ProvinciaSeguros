export { fakeBackend };

// clave para almacenar los usuarios en localStorage
const usersKey = 'vue-3-pinia';


// Recuperando usuarios de localStorage caso contrario inicializamos un []
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

function fakeBackend() {

    // Reemplazo el método fetch original de window con una versión personalizada para simular un backend.
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {


        return new Promise((resolve, reject) => {
            // timer 500 ms
            setTimeout(handleRoute, 500);

            function handleRoute() {
                const routeMap = [
                    {
                        condition: () => url.endsWith('/users/authenticate') && opts.method === 'POST',
                        action: authenticate // Iniciar sesión
                    },
                    {
                        condition: () => url.endsWith('/users/register') && opts.method === 'POST',
                        action: register // Registro de usuario
                    },
                    {
                        condition: () => url.endsWith('/users') && opts.method === 'GET',
                        action: getUsers // Obtener todos los usuarios
                    },
                    {
                        condition: () => url.match(/\/users\/\d+$/) && opts.method === 'GET',
                        action: getUserById // Obtener un usuario por ID
                    },
                    {
                        condition: () => url.match(/\/users\/\d+$/) && opts.method === 'PUT',
                        action: updateUser // Actualizar un usuario
                    },
                    {
                        condition: () => url.match(/\/users\/\d+$/) && opts.method === 'DELETE',
                        action: deleteUser // Eliminar un usuario
                    }
                ];

                const matchedRoute = routeMap.find(route => route.condition());

                if (matchedRoute) {
                    return matchedRoute.action();
                } else {
                    // Default: usar el fetch original
                    return realFetch(url, opts)
                        .then(response => resolve(response))
                        .catch(error => reject(error));
                }
            }
            //Obtiene y convierte el cuerpo de la solicitud en JSON
            function body() {
                return opts.body && JSON.parse(opts.body);
            }
            //registra usuario y compara que no haya uno igual
            function register() {
                const user = body();

                if (users.find(x => x.username === user.username)) {
                    return error('El usuario "' + user.username + '" ya existe')
                }

                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }
            //Autentica con pass & user
            function authenticate() {
                const { username, password } = body();
                const user = users.find(x => x.username === username && x.password === password);

                if (!user) return error('Usuario o contraseña incorrecto');

                return ok({
                    ...basicDetails(user),
                    token: 'fake-jwt'
                });
            }
            //Verifica el token
            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt';
            }
            //mensaje de error
            function error(message) {
                resolve({ status: 400, ...headers(), json: () => Promise.resolve({ message }) })
            }
            //detalles del usuario por ID
            function getUserById() {
                if (!isAuthenticated()) return unauthorized();

                const user = users.find(x => x.id === idFromUrl());
                return ok(basicDetails(user));
            }
            //Obtener y actualizar user
            function updateUser() {
                if (!isAuthenticated()) return unauthorized();

                let params = body();
                let user = users.find(x => x.id === idFromUrl());

                // Comprobando pass
                if (!params.password) {
                    delete params.password;
                }

                // Comprobando usuario existente
                if (params.username !== user.username && users.find(x => x.username === params.username)) {
                    return error('El usuario "' + params.username + '" ya existe')
                }

                // Guardar usuario
                Object.assign(user, params);
                localStorage.setItem(usersKey, JSON.stringify(users));

                return ok();
            }
            //eliminar usuario
            function deleteUser() {
                if (!isAuthenticated()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem(usersKey, JSON.stringify(users));
                return ok();
            }
            //mensaje "sin autorización"
            function unauthorized() {
                resolve({ status: 401, ...headers(), json: () => Promise.resolve({ message: 'Sin autorización' }) })
            }
            //fetching de user
            function basicDetails(user) {
                const { id, username, firstName, lastName } = user;
                return { id, username, firstName, lastName };
            }
            //Obtiene ID de la URL
            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
            //Headers del response
            function headers() {
                return {
                    headers: {
                        get(key) {
                            return ['application/json'];
                        }
                    }
                }
            }
            //200 OK
            function ok(body) {
                resolve({ ok: true, ...headers(), json: () => Promise.resolve(body) })
            }
            //Obteniendo todos los usuarios
            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users.map(x => basicDetails(x)));
            }
        });
    }
}