<template>
  <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <!-- img 1 -->
      <div class="carousel-item active">
        <img
          src="@/assets/carrusel-1.jpg"
          class="d-block w-100"
          alt="Slide 1"
        />
        <div class="carousel-text-item" id="item-1">
          <div class="h3 mb-3rem">
            DESCARGÁ LA APP <br />
            Y ACCEDÉ A<br />
            NUESTROS SERVICIOS<br />
            <p class="p-item-4">
              Lleva con vos la nueva app para tener todo lo que<br />
              necesitás a un dedo de distancia.
            </p>
          </div>
          <button
            class="btn-3 mb-3"
            style="width: 80%; height: 40px"
            id="btn-4"
          >
            <div class="container-icon">
              <i class="fab fa-android"></i>
            </div>
            <h4 class="mt-1" style="font-size: 17px">DESCARGA EN PLAY STORE</h4>
            <div class="container-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </button>
          <button class="btn-3" style="width: 80%; height: 40px" id="btn-4">
            <div class="container-icon">
              <i class="fab fa-apple"></i>
            </div>
            <h4 class="mt-1 p-1" style="font-size: 17px">
              DESCARGA EN APP STORE
            </h4>
            <div class="container-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </button>
        </div>
      </div>
      <!-- img 2 -->
      <div class="carousel-item">
        <img
          src="@/assets/carrusel-2.jpg"
          class="d-block w-100"
          alt="Slide 2"
        />
        <div class="carousel-text-item">
          <div class="h3">
            COTIZÁ Y CONTRATÁ TU<br />
            SEGURO DE AUTO O MOTO<br />
            FÁCIL Y CON BENEFICIOS
          </div>
        </div>
      </div>
      <!-- img 3 -->
      <div class="carousel-item">
        <img
          src="@/assets/carrusel-3.jpg"
          class="d-block w-100"
          alt="Slide 3"
        />
        <div class="carousel-text-item">
          <div class="h3">
            COTIZÁ Y CONTRATÁ TU <br />
            SEGURO DE AUTO O MOTO<br />
            FÁCIL Y CON BENEFICIOS
          </div>
          <button class="btn-3">
            <h4 class="mt-1">Cotizá acá</h4>
            <div class="container-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </button>
        </div>
      </div>
      <!-- img 4 -->
      <div class="carousel-item">
        <img
          src="@/assets/carrusel-4.jpg"
          class="d-block w-100"
          alt="Slide 4"
        />
        <div class="carousel-text-item" id="item-4">
          <div class="h3">
            WEB CLIENTES <br />
            <p class="p-item-4 pb-5">
              Nuevo diseño<br />
              y mas autogestión.
            </p>
          </div>
          <button class="btn-3" id="btn-4">
            <h4 class="mt-1">Clic acá</h4>
            <div class="container-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </button>
        </div>
      </div>
      <!-- img 5 -->
      <div class="carousel-item">
        <img
          src="@/assets/carrusel-5.jpg"
          class="d-block w-100"
          alt="Slide 5"
        />
        <div class="carousel-text-item" id="item-4">
          <div class="h3">
            SEGURO <br />
            PYME<br />
            <p class="p-item-4">
              Un seguro diseñado<br />
              para proteger tu negocio.
            </p>
          </div>
          <button class="btn-3" id="btn-4">
            <h4 class="mt-1">Cotizá acá</h4>
            <div class="container-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </button>
        </div>
      </div>
      <!-- img 6 -->
      <div class="carousel-item">
        <img
          src="@/assets/carrusel-6.jpg"
          class="d-block w-100"
          alt="Slide 6"
        />
        <div class="carousel-text-item">
          <div class="h3">
            DESCARGÁ LA APP <br />
            Y ACCEDÉ A<br />
            NUESTROS SERVICIOS<br />
            <p class="p-item-4">
              Lleva con vos la nueva app para tener todo lo que<br />
              necesitás a un dedo de distancia.
            </p>
          </div>
          <button class="btn-3">
            <h4 class="mt-1">Cotizá acá</h4>
            <div class="container-icon">
              <i class="fas fa-chevron-right"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExample"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden"></span>
    </button>
  </div>
</template>

<style>
.carousel-inner {
  min-height: 600px;
  max-height: 600px;
}
.carousel-control-prev,
.carousel-control-next {
  position: absolute;
  border: none;
  top: 50%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel-control-prev {
  left: 20px;
}

.carousel-control-next {
  right: 20px;
}

.carousel-item {
  position: relative;
}
.carousel-text-item {
  position: absolute;
  top: 44%;
  left: 33%;
  transform: translate(-50%, -50%);
  text-align: left;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.5s ease;
  max-width: 90%;
  word-wrap: break-word;
}

.carousel-item.active .carousel-text-item {
  opacity: 1;
}

.carousel-text-item h3 {
  margin: 0;
}
.h3 {
  margin-bottom: 2rem;
  font-size: 45px;
  font-weight: 400;
  letter-spacing: 0px;
}
.btn-3 {
  background-color: #00317a;
  font-size: 24px;
  display: flex;
  font-weight: 500;
  height: 45px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  color: rgb(255, 255, 255);
  border-radius: 30px;
  box-sizing: border-box;
  cursor: pointer;
  padding: 0px 30px;
}
.container-icon {
  align-items: center;
  justify-content: center;
  display: flex;
}
i {
  margin-left: 10px;
  font-size: 15px;
}
div#item-4 {
  top: 38%;
  left: 23%;
}
div#item-1 {
  top: 38%;
  left: 30%;
}

.p-item-4 {
  font-size: 18px;
}
#btn-4 {
  background-color: rgba(0, 0, 0, 0.85);
}


@media screen and (max-width: 1100px) {
  .carousel-inner {
    min-height: 400px;
    max-height: 400px;
  }

  .carousel-text-item {
    left: 30%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    text-align: center;
  }

  .carousel-text-item h3 {
    font-size: 1.8rem;
  }

  .btn-3 {
    font-size: 16px;
    height: 40px;
    padding: 0px 20px;
  }

  .h3 {
    align-items: flex-start;
    flex-direction: column;
    display: flex;
    font-size: 24px;
  }

  div#item-4,
  div#item-1 {
    left: 30%;
    transform: translate(-50%, -50%);
  }

  .p-item-4 {
    font-size: 14px;
  }
}
@media screen and (max-width: 768px) {
  .carousel-inner {
    min-height: 22vh;
    max-height: 60vh;
  }

  .carousel-text-item {
    font-size: 1rem;
    padding: 10px;
  }
  .carousel-control-prev,
  .carousel-control-next {
    width: 35px;
    height: 35px;
  }
  .carousel-control-next-icon,
  .carousel-control-prev-icon {
    width: 15px;
    height: 15px;
  }
  .h3 {
    font-size: 20px;
  }
  .btn-3 {
    font-size: 14px;
    padding: 6px 15px;
  }

  .p-item-4 {
    font-size: 12px;
  }
  h4 {
    font-size: 20px;
  }
}
@media screen and (max-width: 468px) {
  .carousel-text-item {
    display: none;
  }
}
</style>