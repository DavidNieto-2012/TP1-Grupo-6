
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarro();
});


function procesarPago(event) {
    event.preventDefault(); 

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega algún producto desde la tienda antes de pagar.");
        return;
    }

    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;

    alert(`¡Muchas gracias por tu compra, ${nombre}! El pedido será despachado a: ${direccion}.`);

   
    vaciarCarro();


    window.location.href = "index.html";
}