let producto = null;

function mostrarDetalle(producto) {
  document.title = producto.titulo;
  document.getElementById("titulo").textContent = producto.titulo;
  document.getElementById("tipoProducto").textContent = producto.tipoProducto;
  document.getElementById("id").textContent = producto.id;
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

  producto = obtenerProductoPorId(id);

  if (!producto) { return; }

  mostrarDetalle(producto);

  // Se ejecuta automáticamente al cargar el producto principal
  renderizarRelacionadosDeProducto(producto);
}

cargarDetalle();

// RELACIONADOS DINÁMICOS
function renderizarRelacionadosDeProducto(productoActual) {
  const contenedor = document.querySelector("#contenedor-relacionados");
  if (!contenedor) return;

  const relacionados = obtenerProductosRelacionados(productoActual.relacionados);

  if (relacionados.length > 0) {
    contenedor.innerHTML = generarHtmlProductosRelacionados(relacionados);
  } else {
    contenedor.innerHTML = `<p class="text-muted small text-center w-full">No hay productos relacionados disponibles.</p>`;
  }
}


//BOTONES DE AGREGAR Y COMPRAR

const btnAgregar = document.getElementById("btn-agregar");
const btnComprar = document.getElementById("btn-comprar");
if (btnAgregar) {
  btnAgregar.addEventListener("click", () => {
    if (producto) {
      agregarAlCarro(producto);
      mostrarCarro();
    }
  });
}
if (btnComprar) {
  btnComprar.addEventListener("click", () => {
    if (producto) {
      agregarAlCarro(producto);
      mostrarCarro();
    }
  });
}
