class producto {
    constructor(nombre, descripcion, unidades, precio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.unidades = unidades;
        this.precio = precio;
    }
}

//Variables globales

let arrayProductos = [];
let formulario = document.querySelector("#formulario_producto");
let inputNombre = document.querySelector("#form_nombre");

let nombreI = formulario_producto.children[1].value;
let descripcionI = formulario_producto.children[3].value;
let unidadesI = parseInt(formulario_producto.children[5].value);
let precioI = parseInt(formulario_producto.children[7].value);

let contenedor = document.querySelector("#productoIngresado");
let mostrarTodos = document.querySelector("#mostrarTodos");
let parrafos = mostrarTodos.getElementsByTagName("p");
let bandera = false;

//Eventos botones

formulario.addEventListener('submit', agregarProductos);
btnMostrar.addEventListener('click', MostrarTodosProductos);

//Focus primer input

inputNombre.focus();

//Funciones

//Utilicé la libreria sweet alert para dar aviso de que se deben ingresar todos los campos requeridos para continuar.

function validarForm() {
    nombreI = formulario.children[1].value;
    descripcionI = formulario_producto.children[3].value;
    unidadesI = parseInt(formulario_producto.children[5].value);
    precioI = parseInt(formulario_producto.children[7].value);

    console.log(nombreI);
    console.log(descripcionI);
    console.log(unidadesI);
    console.log(precioI);

    if (nombreI == "" || descripcionI == "" || unidadesI == "" || precioI == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Debe completar todos los campos para continuar",
        })
        inputNombre.focus();
        bandera = false;
    } else {
        bandera = true;
    }
}

//Ultimo objeto agregado.

function AgregarAlDom() {
    contenedor.innerHTML = `<h3> Último producto ingresado: </h3>
    <p><strong> Nombre: </strong> ${nombreI}</p>
    <p><strong> Descripcion: </strong> ${descripcionI}</p>
    <p><strong> Cantidad: </strong> ${unidadesI}</p>
    <p><strong> Precio: </strong> ${precioI}</p>
    <hr>`;
}

// Para agregar productos al array: la libreria elegida fue sweet alert ya que permite crear alertas personalizadas y interactivas. Con la alerta pregunto si se desea agregar los productos.

function agregarProductos(e) {
    e.preventDefault();
    validarForm();
    if (bandera == true) {
        let opcion = confirm;
        if (opcion == true) {
            let formulario = e.target
            arrayProductos.push(new producto(nombreI, descripcionI, unidadesI, precioI));
        }
        Swal.fire({
            title: '¿Desea agregar el producto?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Genial!',
                    '¡El producto ha sido agregado!',
                    'success'
                )
            }
        })

        formulario_producto.children[1].value = "";
        formulario_producto.children[3].value = "";
        formulario_producto.children[5].value = "";
        formulario_producto.children[7].value = "";
        contenedor.innerHTML = "";
        AgregarAlDom();
        inputNombre.focus();
    } else {
        inputNombre.focus();
    }
}

// Mostrar todos los productos en dom.

function MostrarTodosProductos(e) {
    e.preventDefault();
    let i = 0;
    mostrarTodos.innerHTML = "<h3> Listado de todos los Productos:</h3>";
    for (const producto of arrayProductos) {
        mostrarTodos.innerHTML += `
        <p><strong>Nombre: </strong> ${producto.nombre}</p>
        <p><strong>Descripcion: </strong> ${producto.descripcion}</p>
        <p><strong>Cantidad: </strong> ${producto.unidades}</p>
        <p><strong>Precio: </strong> ${producto.precio}</p>
        <hr>`;
    }
}

// Mostrar en local storage para preservar datos: uso json.stringify para transformar un objeto js a un string en formato json.


const producto1 = { id: 2, producto: "Mascara de pestañas Maybelline" };
const enJSON    = JSON.stringify(producto1);

console.log(enJSON); 
console.log(typeof producto1);
console.log(typeof enJSON); 

localStorage.setItem("producto1", enJSON);


// Mostrar y almacenar en local storage usando json.strinfify en un array, ya sea almacenando producto por producto o almacenando el array completo.

const productos = [{ id: 1, producto: "Mascara de pestañas Maybelline", precio: 2270 },
                { id: 2, producto: "Base de Maquillaje Liquida Ligera", precio: 3300 },
                { id: 3, producto: "Delineador de Cejas", precio: 2050 },
                { id: 4, producto: "Rubor Blush Paradise ", precio: 2700 }];

const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };


for (const producto of productos) {
    guardarLocal(producto.id, JSON.stringify(producto));
}

guardarLocal("listaProductos", JSON.stringify(productos));

// Agregué una alerta de advertencia: la libreria elegida fue sweet alert ya que permite crear alertas personalizadas y interactivas. Con la alerta pude agregar que se debe ser mayor de 18 años para continuar.

Swal.fire({
    title: '¡Advertencia!',
    text: 'Debe ser mayor de 18 años para comprar. ¿Desea continuar?',
    icon: 'warning',
    confirmButtonText: 'Sí, continuar.'
})



// Realizo una peticion utilizando fetch con la url de jsonplaceholder.

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())  // convertir a json.
    .then(json => console.log(json))    //imprimir datos dentro de la consola.
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores.


// Objeto json con la propiedad headers.

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" }
})
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))

// Envio datos a una solicitud post utilizando la propiedad body.

let _datos = {
    titulo: "Desafío Fetch",
    principal: "datos",
    Id: 1
}

fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",
    body: JSON.stringify(_datos),
    headers: { "Content-type": "application/json; charset=UTF-8" }
})
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
