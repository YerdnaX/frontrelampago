import clienteApi from './clienteApi';

// Obtiene la lista de usuarios disponibles para asignar a un equipo.
export async function obtenerUsuarios() {
  const respuesta = await clienteApi.get('/usuarios');
  return respuesta.data.datos;
}
