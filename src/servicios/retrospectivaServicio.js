import clienteApi from './clienteApi';

// Obtiene la retrospectiva de un Sprint.
export async function obtenerRetrospectiva(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/retrospectiva`);
  return respuesta.data.datos;
}

// Crea explicitamente la retrospectiva del Sprint.
export async function crearRetrospectiva(idSprint) {
  const respuesta = await clienteApi.post(`/sprints/${idSprint}/retrospectiva`);
  return respuesta.data.datos;
}

// Agrega un aporte a la retrospectiva.
export async function crearElementoRetrospectiva(idRetrospectiva, datos) {
  const respuesta = await clienteApi.post(`/retrospectivas/${idRetrospectiva}/elementos`, datos);
  return respuesta.data.datos;
}

// Agrega una accion de mejora a la retrospectiva.
export async function crearAccionMejora(idRetrospectiva, datos) {
  const respuesta = await clienteApi.post(`/retrospectivas/${idRetrospectiva}/acciones`, datos);
  return respuesta.data.datos;
}

// Actualiza una accion de mejora existente.
export async function actualizarAccionMejora(idAccion, datos) {
  const respuesta = await clienteApi.put(`/acciones-mejora/${idAccion}`, datos);
  return respuesta.data.datos;
}