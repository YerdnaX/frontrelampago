import clienteApi from './clienteApi';

// Obtiene los Sprints de un proyecto.
export async function obtenerSprintsDelProyecto(idProyecto) {
  const respuesta = await clienteApi.get(`/proyectos/${idProyecto}/sprints`);
  return respuesta.data.datos;
}

// Crea un nuevo Sprint asociado a un proyecto.
export async function crearSprint(idProyecto, datos) {
  const respuesta = await clienteApi.post(`/proyectos/${idProyecto}/sprints`, datos);
  return respuesta.data.datos;
}

// Obtiene el detalle de un Sprint, incluyendo su resumen de avance.
export async function obtenerSprintPorId(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}`);
  return respuesta.data.datos;
}

// Actualiza nombre, Sprint Goal, fechas y/o estado de un Sprint.
export async function actualizarSprint(idSprint, datos) {
  const respuesta = await clienteApi.put(`/sprints/${idSprint}`, datos);
  return respuesta.data.datos;
}

// Obtiene las historias comprometidas en el Sprint Backlog.
export async function obtenerSprintBacklog(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/historias`);
  return respuesta.data.datos;
}

// Reemplaza la seleccion de historias del Sprint Backlog (Sprint Planning).
export async function seleccionarHistoriasSprint(idSprint, idsHistorias) {
  const respuesta = await clienteApi.put(`/sprints/${idSprint}/historias`, { historias: idsHistorias });
  return respuesta.data.datos;
}

// Retira una historia del Sprint Backlog.
export async function quitarHistoriaSprint(idSprint, idHistoria) {
  const respuesta = await clienteApi.delete(`/sprints/${idSprint}/historias/${idHistoria}`);
  return respuesta.data.datos;
}

// Cambia el estado de una historia en el tablero del Sprint.
export async function actualizarEstadoHistoria(idHistoria, estado) {
  const respuesta = await clienteApi.put(`/historias/${idHistoria}/estado`, { estado });
  return respuesta.data.datos;
}

// Obtiene el indicador real de cumplimiento del Sprint.
export async function obtenerCumplimientoSprint(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/cumplimiento`);
  return respuesta.data.datos;
}

// Obtiene el resumen previo al cierre formal del Sprint.
export async function obtenerResumenCierreSprint(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/cierre`);
  return respuesta.data.datos;
}

// Cierra formalmente el Sprint.
export async function cerrarSprint(idSprint) {
  const respuesta = await clienteApi.post(`/sprints/${idSprint}/cerrar`);
  return respuesta.data.datos;
}
