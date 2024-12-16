

<template>

  <div class="container">
    <h3 class="h1">COTIZACIÓN ONLINE</h3>
    <div class="container-line mb-3">
      <div class="separator-line"></div>
      <span class="icon"><i class="fa fa-calculator"></i></span>
      <div class="separator-line"></div>
    </div>

    <p class="description">
      Cotizá y obtené en minutos el mejor seguro para tu auto o moto.
    </p>
    <div class="buttons-container">
      <div class="btn-blue">Cotizá el seguro para tu auto</div>
      <div class="btn-blue">Cotizá el seguro para tu moto</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding-top: 3rem;
  color: white;
}
span {
  align-items: center;
  justify-content: center;
  display: flex;
}

i {
  font-size: 19px;
}
.container-line {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.h1 {
  font-weight: 400;
  font-size: 32px;
  margin: 35px 0 12px 0;
}

.icon {
  margin: 0 20px;
  font-size: 3rem;
}

.separator-line {
  width: 115px;
  height: 1px;
  background-color: white;
  margin: 0.5rem auto;
}

.description {
  font-size: 18px;
  margin-bottom: 5rem;
  font-weight: 400;
}

.buttons-container {
  margin-top: 2rem;
}

.btn-blue {
  text-align: center;
  display: flex;
  padding: 6px 30px;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 25px;
  background-color: #00317a;
  width: 38%;
  height: 135px;
  margin: -22px auto;
  cursor: pointer;
  margin-bottom: 70px;
}

.btn-blue:hover {
  background-color: hsl(0, 0%, 15%);
}

@media (max-width: 800px) {
  .btn-blue {
    width: 55%;
    font-size: 15px;
  }
}
</style>