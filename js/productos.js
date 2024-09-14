function mostrarDatos(){
    let request = sendRequest('productos', 'GET', '');
    let table = document.getElementById('productos-table');
    table.innerHTML = "";
    request.onload = function(){
        let data = request.response;
        console.log(data);
        data.forEach(element => {
            table.innerHTML += `
            <tr>            
            <td>${element.nombre}</td>
            <td>${element.descripcion}</td>
            <td>${element.marca}</td>
            <td>${element.precio}</td>
            <td>${element.stock}</td>            
            <td>
                <button type="button" class="btn-editar" onclick='window.location ="/form_productos.html?id=${element._id}"'>Editar</button>
                <button type="button" class="btn-eliminar" onclick='deleteProductos("${element._id}")'>Eliminar</button>
            </td>            
            </tr>
            `
        });        
    }
    request.onerror = function(){
        table.innerHTML = `
        <tr>
        <td colspan="">Error al traer los datos</td>
        </tr>
        `
    }
}

function deleteProductos(id){
    let request = sendRequest('productos/'+id, 'DELETE', '');
    request.onload = function(){
        mostrarDatos();
    }
}

function guardarProductos(){
    let nom = document.getElementById('nombre-n').value
    let des = document.getElementById('descripcion-d').value
    let mar = document.getElementById('marca-m').value
    let pre = document.getElementById('precio-p').value
    let sto = document.getElementById('stock-s').value
    let data = {'nombre':nom, 'descripcion':des, 'marca':mar, 'precio':pre, 'stock':sto}
    let request = sendRequest('productos/', 'POST', data);
    request.onload = function (){
        window.location='productos.html'
    }
    request.onerror = function(){
        alert("Error al guardar los datos")
    }
}

function cargarDatos(id){
    let request = sendRequest('productos/'+id, 'GET', '');
    let nom = document.getElementById('nombre-n')
    let des = document.getElementById('descripcion-d')
    let mar = document.getElementById('marca-m')
    let pre = document.getElementById('precio-p')
    let sto = document.getElementById('stock-s')

    request.onload = function(){

        let data = request.response;
        nom.value = data.nombre
        des.value = data.descripcion
        mar.value = data.marca
        pre.value = data.precio
        sto.value = data.stock        
        console.log(data)
    }

    request.onerror = function(){
        alert("Error al cargar los datos")
    }
}

function modificarProductos(id){
    let nom = document.getElementById('nombre-n').value
    let des = document.getElementById('descripcion-d').value
    let mar = document.getElementById('marca-m').value
    let pre = document.getElementById('precio-p').value
    let sto = document.getElementById('stock-s').value
    let data = {'nombre':nom, 'descripcion':des, 'marca':mar, 'precio':pre, 'stock':sto}
    let request = sendRequest('productos/'+id, 'PUT', data);
    console.log(request)
    request.onload = function(){
        window.location='productos.html'
    }
    request.onerror = function(){
        alert("Error al modificar los datos")
    }
}