import clienteApi from './clienteApi';

// Obtiene los criterios activos de Definition of Done de un proyecto.
export async function obtenerDefinitionDone(idProyecto) {
  const respuesta = await clienteApi.get(`/proyectos/${idProyecto}/definition-done`);
  return respuesta.data.datos;
}

// Crea un nuevo criterio Definition of Done.
export async function crearCriterioDefinitionDone(idProyecto, descripcion) {
  const respuesta = await clienteApi.post(`/proyectos/${idProyecto}/definition-done`, { descripcion });
  return respuesta.data.datos;
}

// Actualiza un criterio Definition of Done existente.
export async function actualizarCriterioDefinitionDone(idDefinitionDone, descripcion) {
  const respuesta = await clienteApi.put(`/definition-done/${idDefinitionDone}`, { descripcion });
  return respuesta.data.datos;
}

// Elimina logicamente un criterio Definition of Done.
export async function eliminarCriterioDefinitionDone(idDefinitionDone) {
  const respuesta = await clienteApi.delete(`/definition-done/${idDefinitionDone}`);
  return respuesta.data.datos;
}

// Obtiene el checklist Definition of Done de una historia.
export async function obtenerChecklistHistoria(idHistoria) {
  const respuesta = await clienteApi.get(`/historias/${idHistoria}/definition-done`);
  return respuesta.data.datos;
}

// Marca o desmarca un criterio DoD dentro de la historia.
export async function actualizarChecklistHistoria(idHistoria, idDefinitionDone, cumplido) {
  const respuesta = await clienteApi.put(`/historias/${idHistoria}/definition-done/${idDefinitionDone}`, { cumplido });
  return respuesta.data.datos;
}