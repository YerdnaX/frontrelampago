import axios from 'axios';
import { URL_API, CLAVE_ALMACENAMIENTO_TOKEN } from '../constantes/constantes';

const clienteApi = axios.create({ baseURL: URL_API });

// Adjunta el token JWT almacenado a cada peticion saliente.
clienteApi.interceptors.request.use((configuracion) => {
  const token = localStorage.getItem(CLAVE_ALMACENAMIENTO_TOKEN);
  if (token) {
    configuracion.headers.Authorization = `Bearer ${token}`;
  }
  return configuracion;
});

// Extrae un mensaje de error legible desde una respuesta fallida de la API.
export function extraerMensajeError(error) {
  return error?.response?.data?.mensaje || 'No fue posible completar la operacion. Intenta nuevamente.';
}

export default clienteApi;
