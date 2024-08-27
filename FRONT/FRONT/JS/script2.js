const apiUrl = 'http://localhost:50951/api/Tacos';
var id = null;

document.addEventListener("DOMContentLoaded", () => {

    function getQueryParam(param) {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get(param);
    }

    if( window.location.search.length > 0 ){
        debugger;
        id = getQueryParam('id');
        let nombre = getQueryParam('nombre');
        let  cantidad = getQueryParam('cantidad');
        let  precio = getQueryParam('precio');

        let txtNombre = document.getElementById('txtProducto');
        let txtCantidad = document.getElementById('txtCantidad');
        let txtPrecio = document.getElementById('txtPrecio');

        txtNombre.value = nombre;
        txtCantidad.value = cantidad;
        txtPrecio.value = precio;
    }


    document.getElementById("btnAceptar").addEventListener('click', function(){
        const nombre = document.getElementById('txtProducto').value;
        const cantidad = document.getElementById('txtCantidad').value;
        const precio = document.getElementById('txtPrecio').value;

        

        if( id==null ){
            //agregar
            const agregarProducto = async (event) => {
           
                const nuevoTaco = {
                    nombre: nombre,
                    cantidad: parseInt(cantidad, 10),
                    precio: parseInt(precio,10),
                };
            
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', 
                        },
                        body: JSON.stringify(nuevoTaco), 
                    });
            
                    if (response.ok) {
                        console.log('Producto agregado exitosamente');
                        window.location.href = `WebII.html`;
                    } else {
                        console.log('Error');
                    }
                } catch (error) {
                    console.log('Error');
                }
            };
            agregarProducto();       
        }

        else{
            //editar
            const editarProducto = async (event) => {
                
                const nuevoTaco = {
                    id : id,
                    nombre: nombre,
                    cantidad: parseInt(cantidad, 10),
                    precio: parseInt(precio,10),
                };
                
                try {
                    // Hacer una solicitud PUT al servidor para actualizar el producto.
                    const response = await fetch(`${apiUrl}/${id}`, { // URL de la API con el ID del producto
                        method: 'PUT', // Método PUT para actualizar el producto
                        headers: {
                            'Content-Type': 'application/json', // El servidor espera JSON en el cuerpo de la solicitud
                        },
                        body: JSON.stringify(nuevoTaco), // Convertimos el objeto a JSON
                    });
            
                    if (response.ok) {
                        console.log('Producto actualizado exitosamente');
                        window.location.href = 'WebII.html';
                    } else {
                        console.log('Error');
                    }
                } catch (error) {
                    console.log('Error');
                }
            };
            editarProducto();
            
        }
    });
    

});



