<script>
export default {
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>
<template>
  <footer class="footer">
    <p class="copyright">
      © {{ currentYear }} Provincia Seguros - Todos los derechos reservados
    </p>
    <p class="legal">
      N° de inscripción en SSN <br />
      0499 <br />
      <br />
      Organismo de control<br />
      www.argentina.gob.ar/ssn
      <br />
      <a href="https://www.argentina.gob.ar/superintendencia-de-seguros">
      <img src="../assets/logo-ssn.png" alt="Logo SSN" class="logo-footer" />

      </a>
      <br />
      La entidad aseguradora dispone de un Servicio de Atención al Asegurado que
      atenderá las consultas y reclamos que presenten los tomadores de seguros,
      asegurados, beneficiarios y/o derechohabientes.
      <br />
      <br />
      El Servicio de Atención al Asegurado está integrado por:
      <br />
      Responsable: Hernán Alonso Javier - 4346-7300 - Int: 7457
      –atencionalaseguradops@pseguros.com.ar <br />
      Suplente: Carlos Marello - 4346-7300 - Int. 7457 -
      atencionalaseguradops@pseguros.com.ar <br />
      <br />
      En caso de que el reclamo no haya sido resuelto o haya sido desestimado,
      total o parcialmente, o que haya sido denegada su admisión, podrá
      comunicarse con la Superintendencia de Seguros de la Nación por teléfono
      al 0800-666-8400, correo electrónico a denuncias@ssn.gob.ar o formulario
      web a través de www.argentina.gob.ar/ssn.<br />
      <br />
    </p>
  </footer>
</template>

<style>
.footer {
  border-top: 1px solid grey;
  bottom: 0;
  width: 100%;
  padding: 17px 10px;
  font-size: 11px;
}

.copyright {
  margin: 1rem 0;
  font-size: 11px;
}

.legal {
  margin: 0 1rem;
  line-height: 1.4;
  padding-inline: 25px;
}

.logo-footer {
  max-width: 100%;
  height: auto;
  display: block;
}

@media (min-width: 768px) {
  .footer {
    text-align: left;
    padding: 0 90px;
  }
  .legal {
    padding-inline: 20px;
  }
  .logo-footer {
    max-width: 326px;
    margin: 15px 0;
  }
}
</style>

