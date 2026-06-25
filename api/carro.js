
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
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  //creo el contenedor con las tarjetas
  const contenedor = document.getElementById("carrito");

  //si no existe el contenedor del carro corta la ejecucion
  if (!contenedor) return;

  contenedor.innerHTML = "";

  //si el carro esta vacio mostrar un cartel 
  if(carrito.length==0){
    contenedor.innerHTML += `
      <h1>No hay productos</h1>
    `;
  }

  carrito.forEach(producto => {
    contenedor.innerHTML += `
      <div class="producto" style="border:1px solid #ccc; padding:10px; margin:10px;">
        <h3>${producto.titulo}</h3>
        <p>Código: ${producto.id}</p>
        <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>

        <button onclick="borrarItem(${producto.id})">Borrar</button>
      </div>
    `;
  });
}

function borrarItem(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  //filtro el item a borrar
  carrito = carrito.filter(
    producto => producto.id !== id
  );

  //guardo el carrito sin el producto marcado
  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarro();
}

function vaciarCarro() {
  //borra la clave carrito del localStorage
  localStorage.removeItem("carrito");

  mostrarCarro();
}