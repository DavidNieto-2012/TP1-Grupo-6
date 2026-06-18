
function mostrarCategoria(categoria) {

    document.title = categoria.nombre;

    document.getElementById("tituloCategoria")
        .textContent = categoria.nombre;

    document.getElementById("descripcionCategoria")
        .textContent = categoria.description;

    document.getElementById("bannerCategoria")
        .src = categoria.imagen;
}

async function cargarPagina () {
    //cargo los datos
    await cargarDatos();

    //1- obtengo la categoria desde la url
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("categoria");

    //busco la categoria
    const categoria = obtenerCategorias().find(
        cat => cat.title === slug
    );

    //busco la lista de productos de esa categoria
    const productos = obtenerProductos().filter(
        prod => prod.categoria === categoria.id
    );

    mostrarCategoria(categoria);
    mostrarProductos(productos);
}

cargarPagina();