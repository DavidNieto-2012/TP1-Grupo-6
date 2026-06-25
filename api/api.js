const domain = "http://127.0.0.1:8080";
const endpoint = `${domain}/api/productos.json`;

// contiene todos los productos del json
let datos = {
    categorias: [],
    productos: []
};

// 1° funcion para cargar todos los productos aquí
async function cargarDatos() {
    const respuesta = await fetch(endpoint);
    if (!respuesta.ok) {
        throw new Error(`No se pudo cargar ${endpoint}: ${respuesta.status}`);
    }
    datos = await respuesta.json();
}

// Función para obtener la lista de productos
function obtenerProductos() {
    return datos.productos ?? [];
}

// función para obtener la lista de categorias
function obtenerCategorias() {
    return datos.categorias ?? [];
}

// Obtener producto por id
function obtenerProductoPorId(id) {
    return obtenerProductos().find(producto => producto.id === id);
}

async function cargarProductos() {
    await cargarDatos();
    let productos = obtenerProductos();
    mostrarProductos(productos);
}

// 3° recibe una lista de productos y genera las tarjetas
function mostrarProductos(listaProductos) {
    const contenedor = document.querySelector("#contenedor-productos");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {
        contenedor.innerHTML += crearTarjeta(producto);
    });
}

// 4° crear tarjeta html con estilo de bootstrap
function crearTarjeta(producto) {
    const foto = producto.fotos.length
        ? domain + producto.fotos[0]
        : "images/noPhoto.jpg";

    const categoria = obtenerCategorias().find(
        cat => cat.id === producto.categoria
    ) ?? { nombre: "Sin categoría" };

    let articleProducto = `
        <article class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
            <div class="card w-90 shadow-sm border-0 p-3" style="border-radius: 12px; background-color: #fff;">
                <figure class="text-center mb-3">
                    <img src="${foto}" class="img-fluid rounded" style="max-height: 250px; object-fit: contain;" alt="${producto.titulo}">
                </figure>
                <div class="card-body d-flex flex-column justify-content-between p-2">
                    <h2 class="font-bold mb-1">${producto.titulo}</h3>

                    <h5 class="text-muted small mb-3">${categoria.nombre}</h5>

                    <p class="card-text text-muted small mb-3">${producto.descripcionCorta}</p>

                    <p class="precio h4 text-dark font-bold mb-3">${producto.precio.toLocaleString("es-AR")}</p>
                    
                    <a href="detalle.html?id=${producto.id}"
                        class="btn-ver btn btn-outline-primary w-100">Ver Detalle
                    </a>
                </div>
            </div>
        </article>
    `;

    return articleProducto;
}


// TAREAS : PRODUCTOS RELACIONADOS (6 y 9)

// 6- Implementar función obtenerProductosRelacionados(ids)
function obtenerProductosRelacionados(ids) {
    if (!ids || !Array.isArray(ids)) return [];
    return obtenerProductos().filter(producto => ids.includes(producto.id));
}

// 9- Función para generar productos relacionados
function generarHtmlProductosRelacionados(listaRelacionados) {
    let html = "";

    listaRelacionados.forEach(producto => {
        const foto = producto.fotos && producto.fotos.length
            ? domain + producto.fotos[0]
            : "images/noPhoto.jpg";

        html += `
            <a href="detalle.html?id=${producto.id}" class="no-underline text-dark">
                <div class="tarjeta" style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: center; max-width: 220px;">
                    <img src="${foto}" alt="${producto.titulo}" style="max-height: 140px; object-fit: contain; margin: 0 auto 10px; display: block;">
                    <div class="tarjeta-info">
                        <h4 class="font-bold text-sm text-[#0e3353] mb-1">${producto.titulo}</h4>
                        <p class="text-xs text-muted mb-2">${producto.descripcionCorta}</p>
                        <span class="precio font-bold text-[#0772ba]">$${producto.precio.toLocaleString("es-AR")}</span>
                    </div>
                </div>
            </a>
        `;
    });

    return html;
}

