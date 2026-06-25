
//AGREGAR AL CARRO
function agregarAlCarro(producto) {

  //crea o recupera el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(producto);

  //convierte a json para guardar
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarro() {
  //crea o recupera el carrito del localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (storageProducto) {
    const productoDatos = JSON.parse(storageProducto);
    //usar datos
  } else {
    console.log("No se encontraron datos del producto");
  }
}

function borrarItem(id) {
  localStorage.removeItem(id);
}

function vaciarCarro() {
  localStorage.clear();
}