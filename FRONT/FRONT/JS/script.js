const apiUrl = 'http://localhost:50951/api/Tacos';
document.addEventListener("DOMContentLoaded", () => {
    load();
});

function agregar(){
    window.location.href = "agregarProducto.html"; 
}

function editar(button){
    const fila = button.parentNode.parentNode; // Obtenemos la fila padre del botón.
   

    //console.log('Fila a editar:', fila.cells[2].innerText); // Muestra el índice de la fila.
    const id =  fila.cells[0].innerText;
    const nombre =  fila.cells[1].innerText;
    const cantidad =  fila.cells[2].innerText;
    const precio =  fila.cells[3].innerText;

    window.location.href = `agregarProducto.html?id=${id}&nombre=${nombre}&cantidad=${cantidad}&precio=${precio}`;
}

function eliminar(id) {
    const eliminarProducto = async (event) => {
        try {
            debugger;
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
    
            if (response.ok) {
                console.log('Producto eliminado exitosamente');
                
                load(); 
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.log('Error');
        }
    };
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
    // Si el usuario cancela, no hacer nada
    if (confirmacion) {
        eliminarProducto();
    }
    
}

function load(){

    const cargarTacos = async () => {
        // debugger; // Se mantiene el debugger para depuración
         try {
             const response = await fetch(apiUrl); 
             const data = await response.json();
             const tabla = document.getElementById('productsTable').getElementsByTagName('tbody')[0]; 
             tabla.innerHTML = ''; 
     
             data.forEach(taco => {
                 const fila = tabla.insertRow();
                 fila.innerHTML = `
                     <td>${taco.id}</td> 
                     <td>${taco.nombre}</td>
                     <td>${taco.cantidad}</td> 
                     <td>${taco.precio}</td>
                     <td>
                         <button id="btnEditar" type="button" value="${taco.id}" onclick="editar(this)">Editar</button>
                         <button id="btnEliminar" type="button" value="${taco.id}" onclick="eliminar(${taco.id})">Eliminar</button>
                     </td>`;
             });
             
         } catch (error) {
             console.log('Error');
         }
     };
     cargarTacos();
}