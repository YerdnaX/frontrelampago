import clienteApi from './clienteApi';

// Obtiene los impedimentos registrados en un Sprint.
export async function obtenerImpedimentosDelSprint(idSprint) {
  const respuesta = await clienteApi.get(`/sprints/${idSprint}/impedimentos`);
  return respuesta.data.datos;
}

// Crea un impedimento directamente para el Sprint (fuera del Daily).
export async function crearImpedimento(idSprint, descripcion) {
  const respuesta = await clienteApi.post(`/sprints/${idSprint}/impedimentos`, { descripcion });
  return respuesta.data.datos;
}

// Actualiza el estado de seguimiento de un impedimento.
export async function actualizarEstadoImpedimento(idImpedimento, estado) {
  const respuesta = await clienteApi.put(`/impedimentos/${idImpedimento}/estado`, { estado });
  return respuesta.data.datos;
}
