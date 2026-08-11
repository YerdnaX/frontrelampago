import { useAutenticacion } from '../hooks/useAutenticacion';
import estilos from './Encabezado.module.css';

// Obtiene las iniciales de un nombre para mostrarlas en el avatar.
function obtenerIniciales(nombre) {
  if (!nombre) return '?';
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();
}

// Encabezado superior con el usuario autenticado y acceso al menu movil.
function Encabezado({ alAbrirMenu }) {
  const { usuario, cerrarSesion } = useAutenticacion();

  return (
    <header className={estilos.encabezado}>
      <button type="button" className={estilos.botonMenu} onClick={alAbrirMenu} aria-label="Abrir menu">
        ☰
      </button>
      <div className={estilos.espaciador} />
      <div className={estilos.usuario}>
        <span className={estilos.avatar} aria-hidden="true">{obtenerIniciales(usuario?.Nombre || usuario?.nombre)}</span>
        <span className={estilos.nombre}>{usuario?.Nombre || usuario?.nombre}</span>
        <button type="button" className="boton boton-fantasma boton-pequeno" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Encabezado;
