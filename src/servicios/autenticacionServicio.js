import clienteApi from './clienteApi';

// Envia las credenciales al backend y devuelve el token junto al usuario.
export async function iniciarSesion(correo, contrasena) {
  const respuesta = await clienteApi.post('/autenticacion/iniciar-sesion', { correo, contrasena });
  return respuesta.data.datos;
}

// Solicita al backend los datos del usuario autenticado.
export async function obtenerUsuarioActual() {
  const respuesta = await clienteApi.get('/autenticacion/usuario');
  return respuesta.data.datos;
}

// Notifica al backend el cierre de sesion.
export async function cerrarSesionRemota() {
  await clienteApi.post('/autenticacion/cerrar-sesion');
}
