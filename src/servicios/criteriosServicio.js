import clienteApi from './clienteApi';

// Agrega un criterio de aceptacion a una historia.
export async function agregarCriterio(idHistoria, descripcion) {
  const respuesta = await clienteApi.post(`/historias/${idHistoria}/criterios`, { descripcion });
  return respuesta.data.datos;
}

// Actualiza la descripcion de un criterio de aceptacion.
export async function actualizarCriterio(idCriterio, descripcion) {
  const respuesta = await clienteApi.put(`/criterios/${idCriterio}`, { descripcion });
  return respuesta.data.datos;
}

// Elimina un criterio de aceptacion.
export async function eliminarCriterio(idCriterio) {
  await clienteApi.delete(`/criterios/${idCriterio}`);
}
