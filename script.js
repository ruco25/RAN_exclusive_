const productos = {
  novedades: [
    { nombre: "Remera Fresh", precio: 1000, img: "https://via.placeholder.com/250", color: ["Negro","Blanco","Azul"], talle: ["S","M","L","XL"] },
    { nombre: "Short Pro", precio: 850, img: "https://via.placeholder.com/250", color: ["Rojo","Negro","Gris"], talle: ["S","M","L","XL"] },
    { nombre: "Musculosa Drop", precio: 900, img: "https://via.placeholder.com/250", color: ["Verde","Negro","Blanco"], talle: ["S","M","L"] },
    { nombre: "Medias RAN", precio: 400, img: "https://via.placeholder.com/250", color: ["Blanco","Negro"], talle: ["Único"] }
  ],
  exclusive: [
    { nombre: "Campera Elite", precio: 2500, img: "https://via.placeholder.com/250", color: ["Negro","Gris","Rojo"], talle: ["S","M","L","XL"] },
    { nombre: "Pantalón Lux", precio: 2300, img: "https://via.placeholder.com/250", color: ["Gris","Negro"], talle: ["S","M","L"] },
    { nombre: "Hoodie Neon", precio: 2000, img: "https://via.placeholder.com/250", color: ["Negro","Verde"], talle: ["S","M","L","XL"] },
    { nombre: "Chaleco Wind", precio: 1800, img: "https://via.placeholder.com/250", color: ["Negro","Blanco"], talle: ["S","M","L"] }
  ],
  drop: [
    { nombre: "Remera Limitada", precio: 1500, img: "https://via.placeholder.com/250", color: ["Negro","Blanco"], talle: ["S","M","L","XL"] },
    { nombre: "Short edición Drop", precio: 1200, img: "https://via.placeholder.com/250", color: ["Negro","Rojo"], talle: ["S","M","L"] },
    { nombre: "Campera Glow", precio: 2700, img: "https://via.placeholder.com/250", color: ["Negro","Lila"], talle: ["M","L","XL"] },
    { nombre: "Musculosa Sport", precio: 1000, img: "https://via.placeholder.com/250", color: ["Azul","Negro"], talle: ["S","M","L"] }
  ]
};

function mostrarSeccion(id) {
  document.querySelectorAll(".seccion").forEach(s => s.style.display = "none");
  const seccion = document.getElementById(id);
  seccion.style.display = "block";
  if (!seccion.innerHTML.trim()) {
    let html = '<div class="productos">';
    productos[id].forEach((p, i) => {
      html += `
        <div class="producto">
          <img src="${p.img}" alt="${p.nombre}" />
          <h3>${p.nombre}</h3>
          <p>$${p.precio}</p>
          <select id="${id}_color_${i}">${p.color.map(c => `<option>${c}</option>`).join("")}</select>
          <select id="${id}_talle_${i}">${p.talle.map(t => `<option>${t}</option>`).join("")}</select>
          <input type="number" id="${id}_cant_${i}" value="1" min="1" />
          <select id="${id}_pago_${i}"><option>Efectivo</option><option>Transferencia</option><option>MercadoPago</option></select>
          <button class="add-btn" onclick="agregarAlCarrito('${id}', ${i})">Agregar</button>
        </div>`;
    });
    html += '</div>';
    seccion.innerHTML = html;
    window.scrollTo({ top: seccion.offsetTop, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: seccion.offsetTop, behavior: 'smooth' });
  }
}

let carrito = [];

function agregarAlCarrito(tipo, index) {
  const prod = productos[tipo][index];
  const color = document.getElementById(`${tipo}_color_${index}`).value;
  const talle = document.getElementById(`${tipo}_talle_${index}`).value;
  const cant = document.getElementById(`${tipo}_cant_${index}`).value;
  const pago = document.getElementById(`${tipo}_pago_${index}`).value;
  carrito.push({ nombre: prod.nombre, color, talle, cant, pago });
  alert("Producto agregado al carrito.");
}

function mostrarCarrito() {
  const cart = document.getElementById("cart");
  cart.style.display = cart.style.display === "block" ? "none" : "block";
  const cont = document.getElementById("cartItems");
  cont.innerHTML = carrito.map(c => `<p>${c.cant}x ${c.nombre} - ${c.color} - ${c.talle} - ${c.pago}</p>`).join('');
}

function finalizarCompra() {
  if (carrito.length === 0) return alert("Tu carrito está vacío.");
  const msg = encodeURIComponent("Hola, quiero comprar:
" + carrito.map(c =>
    `${c.cant}x ${c.nombre} - ${c.color} - ${c.talle} - ${c.pago}`).join('
'));
  window.open("https://wa.me/598091290479?text=" + msg, "_blank");
}
