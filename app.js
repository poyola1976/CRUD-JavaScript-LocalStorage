let listaEmpleados = [];

const objEmpleado = {
  id: ``,
  nombre: ``,
  cargo: ``,
}

let editando = false;

const formulario = document.querySelector(`#formulario`);
const nombreInput = document.querySelector(`#nombre`);
const cargoInput = document.querySelector(`#cargo`);
const btnAgregar = document.querySelector(`#btnAgregar`);

formulario.addEventListener(`submit`, validarFormulario);

function validarFormulario(e) {
  e.preventDefault();

  if (nombreInput.value === `` || cargoInput.value === ``) {
    alert(`Todos los campos son obligatorios`);
    return;
  }

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

function agregarEmpleadoLocalStorage() {
  listaEmpleados.push({ ...objEmpleado });
  guardarLocalStorage();
  mostrarEmpleados();

  formulario.reset();
  limpiarObjeto();
}

function cargarEmpleadosDesdeLocalStorage() {
  if (localStorage.getItem("empleados")) {
    listaEmpleados = JSON.parse(localStorage.getItem("empleados"));
    mostrarEmpleados();
  }
}

function guardarLocalStorage() {
  localStorage.setItem("empleados", JSON.stringify(listaEmpleados));
}

function limpiarObjeto() {
  objEmpleado.id = ``;
  objEmpleado.nombre = ``;
  objEmpleado.cargo = ``;
}

function mostrarEmpleados() {
  limpiarHTML();
  const divEmpleados = document.querySelector(`.div-empleados`);

  listaEmpleados.forEach(empleado => {
    const { id, nombre, cargo } = empleado;

    const parrafo = document.createElement(`p`);
    parrafo.textContent = `Nombre: ${nombre} - Cargo: ${cargo}  `;
    parrafo.dataset.id = id;

    const editarBoton = document.createElement(`button`);
    editarBoton.onclick = () => cargarEmpleado(empleado);
    editarBoton.textContent = `Editar`;
    editarBoton.classList.add(`btn`, `btn-editar`);
    parrafo.append(editarBoton);

    const eliminarBoton = document.createElement(`button`);
    eliminarBoton.onclick = () => eliminarEmpleado(id);
    eliminarBoton.textContent = `Eliminar`;
    eliminarBoton.classList.add(`btn`, `btn-eliminar`);
    parrafo.append(eliminarBoton);

    const hr = document.createElement(`hr`);

    divEmpleados.appendChild(parrafo);
    divEmpleados.appendChild(hr);
  });
}

function cargarEmpleado(empleado) {
  const { id, nombre, cargo } = empleado;

  nombreInput.value = nombre;
  cargoInput.value = cargo;

  objEmpleado.id = id;
  formulario.querySelector(`button[type="submit"]`).textContent = `Actualizar`;

  editando = true;
}

function editarEmpleado() {
  objEmpleado.nombre = nombreInput.value;
  objEmpleado.cargo = cargoInput.value;

  listaEmpleados.map(empleado => {
    if (empleado.id === objEmpleado.id) {
      empleado.nombre = objEmpleado.nombre;
      empleado.cargo = objEmpleado.cargo;
    }
  });

  guardarLocalStorage();
  limpiarHTML();
  mostrarEmpleados();

  formulario.reset();
  formulario.querySelector(`button[type="submit"]`).textContent = `Agregar`;

  editando = false;
}

function eliminarEmpleado(id) {
  listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

  guardarLocalStorage();
  limpiarHTML();
  mostrarEmpleados();
}

function limpiarHTML() {
  const divEmpleados = document.querySelector(`.div-empleados`);

  while (divEmpleados.firstChild) {
    divEmpleados.removeChild(divEmpleados.firstChild);
  }
}

cargarEmpleadosDesdeLocalStorage();
