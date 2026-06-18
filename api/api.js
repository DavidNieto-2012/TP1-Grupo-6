const domain = "http://127.0.0.1:8080";
const endpoint = `${domain}/api/productos.json`;

//contiene todos los productos del json
let datos = {};

//1° funcion para obtener todos los datos del json (productos y categorias)
async function cargarDatos() {

    const respuesta = await fetch(endpoint);
    datos = await respuesta.json();
}

// Función para obtener la lista de productos
function obtenerProductos(){
    return datos.productos;
}

// función para obtener la lista de categorias
function obtenerCategorias() {

    return datos.categorias;

}

// Obtener producto por id
function obtenerProductoPorId(productos, id) {
    return productos.find(producto => producto.id === Number(id));
}


//3° recibe una lista de productos y genera las tarjetas
function mostrarProductos(listaProductos) {

    const contenedor =
        document.querySelector("#contenedor-productos");

    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {
        contenedor.innerHTML += crearTarjeta(producto);
    });
}

//4° crear tarjeta html con estilo de bootstrap
function crearTarjeta(producto) {
    const foto = producto.fotos.length
    ? domain + producto.fotos[0]
    : "images/noPhoto.jpg";

    const categoria = obtenerCategorias().find(
        cat => cat.id === producto.categoria
    );

    let articleProducto = `
        <article class="col-12 col-md-6 col-lg-4 d-flex">
            <div class="card w-100 shadow-sm border-0 p-3" style="border-radius: 12px; background-color: #fff;">
                <figure class="text-center mb-3">
                    <img src="${foto}" class="img-fluid rounded" style="max-height: 250px; object-fit: contain;" alt="${producto.titulo}">
                </figure>
                <div class="card-body d-flex flex-column justify-content-between p-2">
                    <h3 class="h5 text-primary font-bold mb-1">${producto.titulo}</h3>

                    <h5 class="text-muted small mb-3">${categoria.nombre}</h5>

                    <p class="card-text text-muted small mb-3">${producto.descripcionCorta}</p>

                    <p class="precio h4 text-dark font-bold mb-3">$${producto.precio}</p>
                    
                    <a href="detalle.html?id=${producto.id}"
                        class="btn-ver btn btn-outline-primary w-100">Ver Detalle
                    </a>
                </div>
            </div>
        </article>
    `;

    return articleProducto;
}


