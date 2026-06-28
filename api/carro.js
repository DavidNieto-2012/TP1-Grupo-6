function agregarAlCarro(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarro();
}

function mostrarCarro() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const listaContenedor = document.getElementById("lista-carrito");
  const subtotalContenedor = document.getElementById("subtotal-carrito");


  if (listaContenedor) {
    if (carrito.length === 0) {
      listaContenedor.innerHTML = `<li class="py-4 text-center text-muted list-group-item">El carrito está vacío</li>`;
    } else {
      listaContenedor.innerHTML = carrito.map((producto, index) => {
        const foto = producto.fotos && producto.fotos.length ? producto.fotos[0] : "images/noPhoto.jpg";
        return `
          <li class="list-group-item d-flex justify-content-between align-items-center py-3 bg-white" style="border: 1px solid #dee2e6 !important;">
            <div class="d-flex align-items-center gap-3">
              <div style="width: 70px !important; height: 70px !important; min-width: 70px !important; min-height: 70px !important; overflow: hidden !important; border-radius: 6px; border: 1px solid #dee2e6; display: flex; align-items: center; justify-content: center; background-color: #fff;">
                <img src="${foto}" alt="${producto.titulo}" style="width: 100% !important; height: 100% !important; object-fit: contain !important; max-width: 70px !important; max-height: 70px !important;" />
              </div>
              <div>
                <h6 class="my-0" style="font-size: 0.95rem; font-weight: 600; color: #333;">${producto.titulo}</h6>
                <small class="text-muted d-block mt-1">Código: ${producto.id}</small>
                <button type="button" onclick="borrarItem(${index})" class="btn btn-link p-0 text-danger text-decoration-none" style="font-size: 0.8rem; margin-top: 4px;">Quitar</button>
              </div>
            </div>
            <span class="text-dark fw-bold ms-2" style="font-size: 0.95rem;">$${producto.precio.toLocaleString("es-AR")}</span>
          </li>
        `;
      }).join("");
    }
  }


  if (subtotalContenedor) {
    const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
    subtotalContenedor.textContent = `$${total.toLocaleString("es-AR")}`;
  }
}

function borrarItem(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarro();
}

function vaciarCarro() {
  localStorage.removeItem("carrito");
  mostrarCarro();
}


document.addEventListener("DOMContentLoaded", mostrarCarro);