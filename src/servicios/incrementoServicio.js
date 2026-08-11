import clienteApi from './clienteApi';

// Obtiene el incremento documentado y las historias terminadas del Sprint.
export async function obtenerIncremento(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/incremento`);
  return respuesta.data.datos;
}

// Crea o actualiza el resumen del incremento del Sprint.
export async function guardarIncremento(idSprint, datos) {
  const respuesta = await clienteApi.post(`/sprints/${idSprint}/incremento`, datos);
  return respuesta.data.datos;
}