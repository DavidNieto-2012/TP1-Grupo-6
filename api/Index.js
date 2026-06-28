async function cargarDestacados() {
    try {
   
        await cargarDatos();

        // Obtener la lista completa de productos
        const productos = obtenerProductos();


        let productosValidos = productos.filter(p => p.fotos && p.fotos.length > 0);

 
        if (productosValidos.length < 2) {
            productosValidos = productos;
        }

        if (productosValidos.length === 0) {
            console.warn("No se encontraron productos en la API.");
            return;
        }

        const seleccionados = [];

      
        if (productosValidos.length <= 2) {
            seleccionados.push(...productosValidos);
        } else {
         
            while (seleccionados.length < 2) {
                const randomIndex = Math.floor(Math.random() * productosValidos.length);
                const producto = productosValidos[randomIndex];
                if (!seleccionados.includes(producto)) {
                    seleccionados.push(producto);
                }
            }
        }

       
        const contenedor = document.getElementById("contenedor-destacados");
        if (contenedor) {
            contenedor.innerHTML = "";
            seleccionados.forEach(producto => {
                contenedor.innerHTML += crearTarjeta(producto);
            });
        }

        // NUEVO: Ejecutamos el actualizador del carro para enlazar los botones dinámicos creados
        if (typeof mostrarCarro === "function") {
            mostrarCarro();
        }
    } catch (error) {
        console.error("Error al cargar los productos destacados:", error);
    }
}


cargarDestacados();