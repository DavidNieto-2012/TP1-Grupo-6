// domain ya está definido en api.js, no hace falta redeclararlo

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

fetch(`${domain}/api/productos.json`)
  .then(res => res.json())
  .then(data => {
    const producto = data.productos.find(p => p.id === id);

    if (!producto) {
      document.body.innerHTML = "<p class='text-center mt-10'>Producto no encontrado.</p>";
      return;
    }

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
  })
  .catch(err => console.error("Error:", err));