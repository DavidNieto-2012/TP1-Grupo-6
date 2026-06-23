function mostrarDetalle(producto){
  document.title = producto.titulo;
  document.getElementById("titulo").textContent = producto.titulo;
  document.getElementById("tipoProducto").textContent = producto.tipoProducto;
  document.getElementById("precio").textContent = `$${producto.precio.toLocaleString("es-AR")}`;
  document.getElementById("descripcionCorta").textContent = producto.descripcionCorta;
  document.getElementById("descrpcionLarga").textContent = producto.descripcionLarga;
  document.getElementById("pesoContenido").textContent = producto.pesoContenido;
  document.getElementById("modoUso").textContent = producto.modoUso;
  document.getElementById("Ingredientes").textContent = producto.ingredientes.join(", ");

  document.getElementById("beneficios").innerHTML = producto.beneficios
    .map(b => `<li>${b}</li>`)
    .join("");

  // Carrusel
  const carouselInner = document.querySelector(".carousel-inner");
  if (producto.fotos.length > 0) {
    carouselInner.innerHTML = producto.fotos.map((foto, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="${domain + foto}" class="d-block w-100" alt="${producto.titulo}">
      </div>
    `).join("");
  }
}

async function cargarDetalle() {
  await cargarDatos();
  
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));

  const producto = obtenerProductoPorId(id);

  if(!producto){ return;}

  mostrarDetalle(producto);

  //  Se ejecuta automáticamente al cargar el producto principal
  renderizarRelacionadosDeProducto(producto);
}


cargarDetalle();


// TAREA 15, RENDERIZAR RELACIONADOS DINÁMICOS

function renderizarRelacionadosDeProducto(productoActual) {
    const contenedor = document.querySelector("#contenedor-relacionados");
    if (!contenedor) return;

    // Buscamos los objetos de los productos relacionados usando funciones de api.js
    const relacionados = obtenerProductosRelacionados(productoActual.relacionados);

    // HTML dinámico o mostramos un aviso
    if (relacionados.length > 0) {
        contenedor.innerHTML = generarHtmlProductosRelacionados(relacionados);
    } else {
        contenedor.innerHTML = `<p class="text-muted small text-center w-full">No hay productos relacionados disponibles.</p>`;
    }
}