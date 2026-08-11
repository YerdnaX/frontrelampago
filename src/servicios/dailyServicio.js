import clienteApi from './clienteApi';

// Registra la actualizacion Daily Scrum del usuario autenticado.
export async function registrarDaily(idSprint, datos) {
  const respuesta = await clienteApi.post(`/sprints/${idSprint}/dailies`, datos);
  return respuesta.data.datos;
}

// Obtiene las actualizaciones Daily registradas en un Sprint.
export async function obtenerDailiesDelSprint(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/dailies`);
  return respuesta.data.datos;
}
