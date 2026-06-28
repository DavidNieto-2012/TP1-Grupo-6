function agregarAlCarro(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarro() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const listaContenedor = document.getElementById("lista-carrito");
  const subtotalContenedor = document.getElementById("subtotal-carrito");
  const contenedorViejo = document.getElementById("carrito");


  if (listaContenedor) {
    if (carrito.length === 0) {
      listaContenedor.innerHTML = `
        <li class="py-4 text-center text-muted list-group-item">
          El carrito está vacío
        </li>
      `;
    } else {
      listaContenedor.innerHTML = carrito.map((producto, index) => {
        const foto = producto.fotos && producto.fotos.length ? producto.fotos[0] : "images/noPhoto.jpg";
        return `
          <li class="list-group-item d-flex justify-content-between align-items-center py-3 bg-white">
            <div class="d-flex align-items-center gap-3">
              <div style="width: 70px !important; height: 70px !important; min-width: 70px !important; min-height: 70px !important; overflow: hidden !important; border-radius: 6px; border: 1px solid #dee2e6; display: flex; align-items: center; justify-content: center; background-color: #fff;">
                <img src="${foto}" alt="${producto.titulo}" class="img-carrito-fija" />
              </div>
              <div>
                <h6 class="my-0" style="font-size: 0.95rem; font-weight: 600; color: #333;">
                  <a href="detalle.html?id=${producto.id}" class="text-decoration-none text-dark">${producto.titulo}</a>
                </h6>
                <small class="text-muted d-block mt-1">Código: ${producto.id}</small>
                <button type="button" onclick="borrarItem(${index})" class="btn btn-link p-0 text-danger text-decoration-none" style="font-size: 0.8rem; margin-top: 4px;">
                  Quitar
                </button>
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


  if (contenedorViejo) {
    contenedorViejo.innerHTML = "";
    if (carrito.length === 0) {
      contenedorViejo.innerHTML = "<h1>No hay productos</h1>";
    } else {
      carrito.forEach((producto, index) => {
        const foto = producto.fotos.length ? producto.fotos[0] : "images/noPhoto.jpg";
        contenedorViejo.innerHTML += `
          <div class="producto" style="border:1px solid #ccc; padding:10px; margin:10px;">
            <img src="${foto}" class="img-fluid rounded" style="max-height: 100px; object-fit: contain;" alt="${producto.titulo}">
            <h3>${producto.titulo}</h3>
            <p>Código: ${producto.id}</p>
            <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>
            <button onclick="borrarItem(${index})">Borrar</button>
          </div>
        `;
      });
    }
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


document.addEventListener("click", function(event) {

  const textoBoton = event.target.textContent ? event.target.textContent.trim().toLowerCase() : "";
  
  if (textoBoton === "finalizar compra" || event.target.id === "btn-finalizar-compra" || event.target.closest("[onclick*='checkout']")) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (carrito.length > 0) {
      window.location.href = "checkout.html";
    } else {
      alert("El carrito está vacío. Agregá algún producto antes de pagar.");
    }
  }
});