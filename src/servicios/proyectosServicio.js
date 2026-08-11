import clienteApi from './clienteApi';

// Obtiene la lista de proyectos/productos registrados.
export async function obtenerProyectos() {
  const respuesta = await clienteApi.get('/proyectos');
  return respuesta.data.datos;
}

// Crea un nuevo producto/proyecto asociado a un equipo Scrum.
export async function crearProyecto(datos) {
  const respuesta = await clienteApi.post('/proyectos', datos);
  return respuesta.data.datos;
}

// Obtiene el detalle de un proyecto especifico.
export async function obtenerProyectoPorId(idProyecto) {
  const respuesta = await clienteApi.get(`/proyectos/${idProyecto}`);
  return respuesta.data.datos;
}

// Actualiza los datos de un proyecto, incluyendo el Product Goal.
export async function actualizarProyecto(idProyecto, datos) {
  const respuesta = await clienteApi.put(`/proyectos/${idProyecto}`, datos);
  return respuesta.data.datos;
}
