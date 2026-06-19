GRUPO:
    -Garcia Schmidt Barbara
    -Nieto David
    -Santillan Rodrigo

WEB DE INSPIRACIÓN: https://www.cerave.com.ar/

ENTREGA 3:
ARCHIVO productos.json
1- Definir estructura de datos para cada producto. Incluir campos: id, nombre, precio, descripción, categoría, imagen, beneficios, ingredientes, instrucciones. Organizar productos en 3 categorías (Piel Seca, Piel Mixta/Grasa, Piel Sensible). — BARBY hecho
1.1- Agregar rgistro categoria al Json (id, titulo, descripcion, foto) hecho
2- Asignar rutas correctas de imágenes en el json. Incluir datos de "productos relacionados" para cada uno. — DAVID hecho

ARCHIVO api.js
3- Implementar función obtenerTodosLosProductos() - retorna todos los productos. — RODRI hecho
4- Implementar función obtenerProductoPorId(id) - retorna un producto específico. — DAVID hecho
5- Implementar función obtenerProductosPorCategoria(categoria) - filtra por categoría. — BARBY hecho
6- Implementar función obtenerProductosRelacionados(ids) - para mostrar los relacionados de cada producto. — RODRI hecho
7- Función para formatear precios. — DAVID hecho
8- Función para generar HTML de tarjetas de producto. — BARBY hecho
9- Función para generar productos relacionados. — RODRI

ARCHIVOS html
10- Actualizar productos.html: Añadir contenedor dinámico para las tarjetas. Script que cargue todos los productos usando la API. Renderizar tarjetas de producto dinámicamente. — DAVID hecho
11- Unir htmls de categoria en uno solo categoria.html: Cargue productos filtrados por categoría.— BARBY hecho
14- Actualizar páginas de detalle (/productos/detalle-*.html): Extraer ID del producto de URL o parámetro. Cargar datos dinámicamente usando obtenerProductoPorId(). Renderizar detalles completos. — BARBY hecho
15- Cargar "productos relacionados" dinámicamente en página de detalle. — RODRI
16- Actualizar index.html: Cargar productos destacados desde la API. Renderizar carrusel o grid de productos populares. — DAVID

Resumen

BARBY (5 tareas) 1, 5, 8, 11, 14

RODRI (5 tareas) 3, 6, 9, 15

DAVID (6 tareas) 2, 4, 7, 10, 16

Extra: si queda tiempo se puede implementar filtrado por nombre y por precio