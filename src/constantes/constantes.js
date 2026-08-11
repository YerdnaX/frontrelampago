// Prioridades validas para una historia de usuario.
export const PRIORIDADES = ['Alta', 'Media', 'Baja'];

// Valores validos de Story Points (secuencia Fibonacci simplificada).
export const STORY_POINTS = [1, 2, 3, 5, 8, 13];

// Roles Scrum permitidos dentro de un equipo.
export const ROLES_SCRUM = ['Product Owner', 'Scrum Master', 'Developer'];

// Clave utilizada para persistir la sesion en el almacenamiento local.
export const CLAVE_ALMACENAMIENTO_TOKEN = 'relampago_token';
export const CLAVE_ALMACENAMIENTO_USUARIO = 'relampago_usuario';

// URL base de la API, configurable mediante variable de entorno.
export const URL_API = import.meta.env.VITE_URL_API || 'http://localhost:4000/api';
