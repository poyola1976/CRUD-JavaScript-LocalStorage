// Definición de variables y objetos
let listaEmpleados = [];

const objEmpleado = {
    id: ``,
    nombre: ``,
    cargo: ``,
}

let editando = false;

// Seleccionar elementos del DOM
const formulario = document.querySelector(`#formulario`);
const nombreInput = document.querySelector(`#nombre`);
const cargoInput = document.querySelector(`#cargo`);
const btnAgregar = document.querySelector(`#btnAgregar`);

// Validar formulario
formulario.addEventListener(`submit`, validarFormulario);

// Funcion para validar el formulario al enviar
function validarFormulario(e) {
    e.preventDefault();

    // Verificar si los campos estan llenos
    if (nombreInput.value === `` || cargoInput.value === ``) {
        alert(`Todos los campos son obligatorios`);
        return;
    }

    // Si se esta editando, llamar a la funcion editarEmpleado, de lo contrario, agregar un nuevo empleado
    if (editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.cargo = cargoInput.value;

        agregarEmpleadoLocalStorage();
    }
}

// Agregar empleado al localStorage
function agregarEmpleadoLocalStorage() {
    listaEmpleados.push({ ...objEmpleado }); // Agregar el objeto empleado al array
    guardarLocalStorage(); // Guardar en localStorage
    mostrarEmpleados(); // Actualizar la visualización en la interfaz

    formulario.reset(); // Limpiar formulario
    limpiarObjeto(); // Limpiar el objeto empleado
}

// Cargar empleados almacenados en localStorage al cargar la pagina
function cargarEmpleadosLocalStorage() {
    if (localStorage.getItem("empleados")) {
        listaEmpleados = JSON.parse(localStorage.getItem("empleados"));
        mostrarEmpleados(); // Actualizar la visualizacion en la interfaz
    }
}

// Guardar la lista de empleados en localStorage
function guardarLocalStorage() {
    localStorage.setItem("empleados", JSON.stringify(listaEmpleados));
}

// Limpiar las propiedades del objeto 
function limpiarObjeto() {
    objEmpleado.id = ``;
    objEmpleado.nombre = ``;
    objEmpleado.cargo = ``;
}

// Mostrar la lista de empleados 
function mostrarEmpleados() {
    limpiarHTML(); // Limpiar el contenido anterior
    const divEmpleados = document.querySelector(`.div-empleados`);

    // Iterar a traves de la lista de empleados y crear elementos HTML para mostrarlos
    listaEmpleados.forEach(empleado => {
        const { id, nombre, cargo } = empleado;

        const parrafo = document.createElement(`p`);
        parrafo.textContent = `Nombre: ${nombre} - Cargo: ${cargo}  `;
        parrafo.dataset.id = id;

        // Boton para editar el empleado
        const editarBoton = document.createElement(`button`);
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = `Editar`;
        editarBoton.classList.add(`btn`, `btn-editar`);
        parrafo.append(editarBoton);

        // Boton para eliminar el empleado
        const eliminarBoton = document.createElement(`button`);
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = `Eliminar`;
        eliminarBoton.classList.add(`btn`, `btn-eliminar`);
        parrafo.append(eliminarBoton);
        // Linea horizontal para separar
        const hr = document.createElement(`hr`);
        // Agregar elementos a la interfaz
        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

// Cargar datos de un empleado en el formulario para editar
function cargarEmpleado(empleado) {
    const { id, nombre, cargo } = empleado;

    nombreInput.value = nombre;
    cargoInput.value = cargo;

    objEmpleado.id = id;
    formulario.querySelector(`button[type="submit"]`).textContent = `Actualizar`;

    editando = true;
}

// Editar los datos de un empleado
function editarEmpleado() {
    objEmpleado.nombre = nombreInput.value;
    objEmpleado.cargo = cargoInput.value;

    // Actualizar la lista de empleados en el array
    listaEmpleados.map(empleado => {
        if (empleado.id === objEmpleado.id) {
            empleado.nombre = objEmpleado.nombre;
            empleado.cargo = objEmpleado.cargo;
        }
    });
    // Actualizar localStorage
    guardarLocalStorage();
    // Limpiar contenido anterior
    limpiarHTML();
    // Mostrar lista actualizada en la interfaz
    mostrarEmpleados();
    // Limpiar formulario
    formulario.reset();
    formulario.querySelector(`button[type="submit"]`).textContent = `Agregar`;

    editando = false;
}

// Eliminar un empleado por su ID
function eliminarEmpleado(id) {
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    guardarLocalStorage(); // Actualizar localStorage
    limpiarHTML(); // Limpiar contenido anterior
    mostrarEmpleados(); // Mostrar lista actualizada en la interfaz
}

// Limpiar el contenido HTML de la interfaz
function limpiarHTML() {
    const divEmpleados = document.querySelector(`.div-empleados`);

    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

// Cargar empleados desde localStorage al cargar la página
cargarEmpleadosLocalStorage();
