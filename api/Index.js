// Función para cargar y mostrar 2 productos destacados de forma aleatoria desde la API
async function cargarDestacados() {
    try {
        // Cargar todos los datos utilizando la función provista en api.js
        await cargarDatos();

        // Obtener la lista completa de productos
        const productos = obtenerProductos();

        // Filtrar productos para asegurarnos de que tengan imágenes y no sean solo productos de relleno
        let productosValidos = productos.filter(p => p.fotos && p.fotos.length > 0);

        // Si por alguna razón no hay suficientes productos con fotos, usamos la lista completa
        if (productosValidos.length < 2) {
            productosValidos = productos;
        }

        if (productosValidos.length === 0) {
            console.warn("No se encontraron productos en la API.");
            return;
        }

        const seleccionados = [];

        // Si hay 2 o menos productos válidos, los seleccionamos todos
        if (productosValidos.length <= 2) {
            seleccionados.push(...productosValidos);
        } else {
            // Seleccionar exactamente 2 productos distintos de forma aleatoria
            while (seleccionados.length < 2) {
                const randomIndex = Math.floor(Math.random() * productosValidos.length);
                const producto = productosValidos[randomIndex];
                if (!seleccionados.includes(producto)) {
                    seleccionados.push(producto);
                }
            }
        }

        // Obtener el contenedor en el index.html y renderizar los productos
        const contenedor = document.getElementById("contenedor-destacados");
        if (contenedor) {
            contenedor.innerHTML = "";
            seleccionados.forEach(producto => {
                contenedor.innerHTML += crearTarjeta(producto);
            });
        }
    } catch (error) {
        console.error("Error al cargar los productos destacados:", error);
    }
}

// Inicializar la carga cuando el archivo se ejecute
cargarDestacados();
