// ==========================
// CARRITO DE COMPRAS
// ==========================

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(nombre, precio) {
  const index = carrito.findIndex(item => item.nombre === nombre);
  if (index !== -1) {
    carrito[index].cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarYRenderizar();
}

function renderCarrito() {
  const tbody = document.getElementById('carrito-body');
  const totalEl = document.getElementById('total');
  if (!tbody || !totalEl) return;

  tbody.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toLocaleString()}</td>
      <td>
        <input type="number" min="1" value="${producto.cantidad}" aria-label="Cantidad de ${producto.nombre}" onchange="cambiarCantidad(${index}, this.value)" />
      </td>
      <td>$${subtotal.toLocaleString()}</td>
      <td><button class="btn" type="button" onclick="eliminarProducto(${index})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });

  totalEl.textContent = 'Total: $' + total.toLocaleString();
}

function cambiarCantidad(index, nuevaCantidad) {
  nuevaCantidad = parseInt(nuevaCantidad);
  if (isNaN(nuevaCantidad) || nuevaCantidad < 1) return;
  carrito[index].cantidad = nuevaCantidad;
  guardarYRenderizar();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarYRenderizar();
}

function vaciarCarrito() {
  if (confirm('¿Estás seguro de vaciar el carrito?')) {
    carrito = [];
    guardarYRenderizar();
  }
}

function guardarYRenderizar() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCarrito();

  // Página de productos (Parte_2.html)
  if (document.querySelector('main.catalogo')) {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach((boton) => {
      boton.addEventListener('click', () => {
        const productoEl = boton.closest('article.producto');
        const nombre = productoEl.querySelector('h3').textContent.trim();

        let precioBase = 500;

        const selectTam = productoEl.querySelector('select');
        const tamaño = selectTam ? selectTam.value.toLowerCase() : 'mediana';

        if (tamaño === 'pequeña') precioBase = 400;
        else if (tamaño === 'mediana') precioBase = 500;
        else if (tamaño === 'grande') precioBase = 700;

        agregarAlCarrito(nombre, precioBase);
        alert(`Agregaste ${nombre} (${tamaño}) al carrito`);
      });
    });
  }
});
let estadoIndex = 0;
const estadosPedido = document.querySelectorAll('#estadoPedido p');

function actualizarEstado() {
  if (estadoIndex < estadosPedido.length - 1) {
    estadosPedido[estadoIndex].classList.remove('active');
    estadoIndex++;
    estadosPedido[estadoIndex].classList.add('active');
  } else {
    alert("El pedido ya fue entregado.");
  }
}

const ubicaciones = [
  "Centro de distribución",
  "En camino - Región Metropolitana",
  "Llegando a destino",
  "Entregado"
];

const ubicacionesFisicas = [
  "Santiago, Chile",
  "Maipú, RM",
  "Puente Alto, RM",
  "Dirección del cliente"
];

let envioIndex = 0;

function simularEnvio() {
  if (envioIndex < ubicaciones.length - 1) {
    envioIndex++;
    document.getElementById("estadoEnvio").textContent = ubicaciones[envioIndex];
    document.getElementById("ubicacionActual").textContent = ubicacionesFisicas[envioIndex];
  } else {
    alert("El paquete ya fue entregado.");
  }
}

function guardarFecha() {
  const fecha = document.getElementById("fechaEntrega").value;
  if (fecha) {
    document.getElementById("fechaConfirmada").textContent = "Fecha preferida de entrega: " + fecha;
  } else {
    alert("Por favor selecciona una fecha.");
  }
}


