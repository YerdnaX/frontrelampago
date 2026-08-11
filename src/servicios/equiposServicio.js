import clienteApi from './clienteApi';

// Obtiene la lista de equipos Scrum registrados.
export async function obtenerEquipos() {
  const respuesta = await clienteApi.get('/equipos');
  return respuesta.data.datos;
}

// Crea un nuevo equipo Scrum.
export async function crearEquipo(datos) {
  const respuesta = await clienteApi.post('/equipos', datos);
  return respuesta.data.datos;
}

// Obtiene un equipo especifico junto con sus miembros.
export async function obtenerEquipoPorId(idEquipo) {
  const respuesta = await clienteApi.get(`/equipos/${idEquipo}`);
  return respuesta.data.datos;
}

// Agrega un usuario al equipo con un rol Scrum determinado.
export async function agregarMiembroEquipo(idEquipo, idUsuario, rolScrum) {
  const respuesta = await clienteApi.post(`/equipos/${idEquipo}/miembros`, { idUsuario, rolScrum });
  return respuesta.data.datos;
}

// Actualiza el rol Scrum de un miembro del equipo.
export async function actualizarRolMiembroEquipo(idEquipo, idEquipoMiembro, rolScrum) {
  const respuesta = await clienteApi.put(`/equipos/${idEquipo}/miembros/${idEquipoMiembro}`, { rolScrum });
  return respuesta.data.datos;
}
