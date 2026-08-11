// Prioridades validas para una historia de usuario.
export const PRIORIDADES = ['Alta', 'Media', 'Baja'];

// Valores validos de Story Points (secuencia Fibonacci simplificada).
export const STORY_POINTS = [1, 2, 3, 5, 8, 13];

// Roles Scrum permitidos dentro de un equipo.
export const ROLES_SCRUM = ['Product Owner', 'Scrum Master', 'Developer'];

// Estados posibles de una historia dentro del tablero del Sprint, en orden.
export const ESTADOS_HISTORIA = ['Pendiente', 'En progreso', 'En revisión', 'Pruebas', 'Terminado'];

// Estados posibles de un Sprint.
export const ESTADOS_SPRINT = ['Planificado', 'Activo', 'Finalizado'];

// Estados posibles de un impedimento, en orden de seguimiento.
export const ESTADOS_IMPEDIMENTO = ['Abierto', 'Gestionándose', 'Resuelto'];

// Resultados posibles de la Sprint Review.
export const RESULTADOS_REVIEW = ['Aceptada', 'Requiere ajustes'];

// Tipos posibles de elementos de retrospectiva.
export const TIPOS_RETROSPECTIVA = ['Positivo', 'Mejora'];

// Estados posibles de una accion de mejora.
export const ESTADOS_ACCION_MEJORA = ['Pendiente', 'En progreso', 'Completada'];

// Clave utilizada para persistir la sesion en el almacenamiento local.
export const CLAVE_ALMACENAMIENTO_TOKEN = 'relampago_token';
export const CLAVE_ALMACENAMIENTO_USUARIO = 'relampago_usuario';

// URL base de la API, configurable mediante variable de entorno.
export const URL_API = import.meta.env.VITE_URL_API || 'http://localhost:4000/api';
