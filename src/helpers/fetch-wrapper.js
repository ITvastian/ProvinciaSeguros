// Importa el store de autenticación donde se gestionan los datos de usuario y sesión
import { useAuthStore } from '@/stores';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

// funcion que recibe el metodo HTTP
function request(method) {
    return async (url, body) => {
        try {
            // Configuración HTTP
            const requestOptions = {
                method, // metodo HTTP 
                headers: authHeader(url), //headers de la solicitud, incluye token
            };

            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body); // Convierte el cuerpo a JSON
            }

            // se hace la solicitud con fetch y se maneja la respuesta
            const response = await fetch(url, requestOptions);
            return await handleResponse(response);

        } catch (error) {
            // manejo de errores
            console.error('Error en la solicitud:', error);
            throw error;
        }
    }
}


function authHeader(url) {
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && user) {
            logout();
        }

        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }

    return data;
}