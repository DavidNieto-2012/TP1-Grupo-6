
//AGREGAR AL CARRO
function agregarAlCarro(producto) {

  //crea o recupera el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(producto);

  //convierte a json para guardar
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarro() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Contenedores del drawer de Tailwind
  const listaContenedor = document.getElementById("lista-carrito");
  const subtotalContenedor = document.getElementById("subtotal-carrito");

  // Contenedor antiguo de prueba
  const contenedorViejo = document.getElementById("carrito");

  // 1. Renderizar en el nuevo drawer de Tailwind (si existe en la página actual)
  if (listaContenedor) {
    if (carrito.length === 0) {
      listaContenedor.innerHTML = `
        <li class="py-6 text-center text-gray-500">
          El carrito está vacío
        </li>
      `;
    } else {
      listaContenedor.innerHTML = carrito.map((producto, index) => {
        const foto = producto.fotos && producto.fotos.length ? producto.fotos[0] : "images/noPhoto.jpg";
        return `
          <li class="flex py-6">
            <div class="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img src="${foto}" alt="${producto.titulo}" class="size-full object-cover" />
            </div>
            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="detalle.html?id=${producto.id}">${producto.titulo}</a>
                  </h3>
                  <p class="ml-4">$${producto.precio.toLocaleString("es-AR")}</p>
                </div>
                <p class="mt-1 text-sm text-gray-500">Código: ${producto.id}</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-gray-500">Cantidad: 1</p>
                <div class="flex">
                  <button type="button" onclick="borrarItem(${index})" class="font-medium text-white hover:text-white cursor-pointer">
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

  // 2. Actualizar el subtotal del nuevo drawer
  if (subtotalContenedor) {
    const total = carrito.reduce((sum, prod) => sum + prod.precio, 0);
    subtotalContenedor.textContent = `$${total.toLocaleString("es-AR")}`;
  }

  // 3. Compatibilidad con el contenedor de prueba antiguo (opcional)
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

  // Elimina solo el elemento en la posición (index) seleccionada
  carrito.splice(index, 1);

  //guardo el carrito sin el producto marcado
  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarro();
}

function vaciarCarro() {
  //borra la clave carrito del localStorage
  localStorage.removeItem("carrito");

  mostrarCarro();
}