import clienteApi from './clienteApi';

// Obtiene la Sprint Review de un Sprint.
export async function obtenerReview(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/review`);
  return respuesta.data.datos;
}

// Crea o actualiza el resumen principal de la Sprint Review.
export async function guardarReview(idSprint, resumen) {
  const respuesta = await clienteApi.post(`/sprints/${idSprint}/review`, { resumen });
  return respuesta.data.datos;
}

// Actualiza el resumen principal de la Sprint Review.
export async function actualizarReview(idSprint, resumen) {
  const respuesta = await clienteApi.put(`/sprints/${idSprint}/review`, { resumen });
  return respuesta.data.datos;
}

// Registra la decision del Product Owner sobre una historia presentada.
export async function registrarRevisionHistoria(idSprint, idHistoria, datos) {
  const respuesta = await clienteApi.post(`/sprints/${idSprint}/review/historias/${idHistoria}`, datos);
  return respuesta.data.datos;
}

// Obtiene el feedback asociado a la Sprint Review.
export async function obtenerFeedbackReview(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/review/feedback`);
  return respuesta.data.datos;
}

// Registra feedback durante la Sprint Review.
export async function registrarFeedbackReview(idSprint, datos) {
  const respuesta = await clienteApi.post(`/sprints/${idSprint}/review/feedback`, datos);
  return respuesta.data.datos;
}