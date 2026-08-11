import clienteApi from './clienteApi';

// Obtiene las historias del Product Backlog de un proyecto.
export async function obtenerHistoriasDelProyecto(idProyecto) {
  const respuesta = await clienteApi.get(`/proyectos/${idProyecto}/historias`);
  return respuesta.data.datos;
}

// Crea una nueva historia de usuario dentro del backlog.
export async function crearHistoria(idProyecto, datos) {
  const respuesta = await clienteApi.post(`/proyectos/${idProyecto}/historias`, datos);
  return respuesta.data.datos;
}

// Obtiene el detalle de una historia junto con sus criterios.
export async function obtenerHistoriaPorId(idHistoria) {
  const respuesta = await clienteApi.get(`/historias/${idHistoria}`);
  return respuesta.data.datos;
}

// Actualiza los datos editables de una historia de usuario.
export async function actualizarHistoria(idHistoria, datos) {
  const respuesta = await clienteApi.put(`/historias/${idHistoria}`, datos);
  return respuesta.data.datos;
}

// Envia el nuevo orden del backlog al backend.
export async function reordenarHistorias(idProyecto, idsOrdenados) {
  const respuesta = await clienteApi.put(`/proyectos/${idProyecto}/historias/orden`, { idsOrdenados });
  return respuesta.data.datos;
}
