document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registro-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const fechaNacimientoInput = document.getElementById('fecha-nacimiento').value;
    const codigoDescuento = document.getElementById('codigo-descuento').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!fechaNacimientoInput) {
      alert('Por favor ingresa tu fecha de nacimiento.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const fechaNacimiento = new Date(fechaNacimientoInput);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    let descuento50 = edad >= 50;
    let descuento10 = codigoDescuento.toUpperCase() === 'FELICES50';

    let tortaGratis = false;
    if (email.endsWith('@duoc.cl')) {
      if (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() === fechaNacimiento.getDate()) {
        tortaGratis = true;
      }
    }

    let mensaje = `¡Registro exitoso, ${nombre}!\n\n`;

    if (descuento50) {
      mensaje += '- Tienes un 50% de descuento por ser mayor de 50 años.\n';
    }
    if (descuento10) {
      mensaje += '- Tienes un 10% de descuento de por vida con el código "FELICES50".\n';
    }
    if (tortaGratis) {
      mensaje += '- ¡Felicidades! Tienes derecho a una torta gratis por tu cumpleaños y ser estudiante Duoc.\n';
    }
    if (!descuento50 && !descuento10 && !tortaGratis) {
      mensaje += '- No tienes descuentos especiales por el momento.\n';
    }

    alert(mensaje);
  });
  //---------------------------------------------------------------------------------------------------------------
  ///--------------------------------------------------------------------------------------------------------------
  
});
