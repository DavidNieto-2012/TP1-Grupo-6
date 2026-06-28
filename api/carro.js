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
      listaContenedor.innerHTML = `
        <li class="flex py-6 justify-center text-gray-500 font-medium">
          El carrito está vacío
        </li>
      `;
    } else {
      listaContenedor.innerHTML = carrito.map((producto, index) => {
        const foto = producto.fotos && producto.fotos.length ? producto.fotos[0] : "images/noPhoto.jpg";
        return `
          <li class="flex py-6 border-b border-gray-200">
            <div class="size-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white flex items-center justify-center p-1">
              <img src="${foto}" alt="${producto.titulo}" class="size-full object-contain max-h-full max-w-full" />
            </div>

            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="detalle.html?id=${producto.id}" class="hover:text-[#0772ba] transition-colors no-underline line-clamp-2 text-sm">${producto.titulo}</a>
                  </h3>
                  <p class="ml-4 font-semibold text-gray-900 shrink-0">$${producto.precio.toLocaleString("es-AR")}</p>
                </div>
                <p class="mt-1 text-xs text-gray-500">Código: ${producto.id}</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-gray-500">Cant: 1</p>
                <div class="flex">
                  <button type="button" onclick="borrarItem(${index})" class="font-medium text-[#0772ba] hover:text-[#0e3353] bg-transparent p-0 border-none cursor-pointer transition-colors">
                    Quitar
                  </button>
                </div>
              </div>
            </div>
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