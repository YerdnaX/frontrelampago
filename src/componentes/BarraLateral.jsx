import { NavLink } from 'react-router-dom';
import estilos from './BarraLateral.module.css';

const ENLACES = [
  { hacia: '/proyectos', etiqueta: 'Proyectos', icono: '◧' },
  { hacia: '/equipos', etiqueta: 'Equipos Scrum', icono: '◔' },
];

// Muestra la navegacion principal de la aplicacion.
function BarraLateral({ abierta, alCerrar }) {
  return (
    <>
      {abierta && <div className={estilos.superposicion} onClick={alCerrar} aria-hidden="true" />}
      <aside className={`${estilos.barra} ${abierta ? estilos.abierta : ''}`}>
        <div className={estilos.marca}>
          <span className={estilos.rayo} aria-hidden="true">⚡</span>
          <span>Relámpago</span>
        </div>
        <nav className={estilos.navegacion} aria-label="Navegacion principal">
          {ENLACES.map((enlace) => (
            <NavLink
              key={enlace.hacia}
              to={enlace.hacia}
              className={({ isActive }) => `${estilos.enlace} ${isActive ? estilos.activo : ''}`}
              onClick={alCerrar}
            >
              <span aria-hidden="true">{enlace.icono}</span>
              {enlace.etiqueta}
            </NavLink>
          ))}
        </nav>
        <div className={estilos.pie}>
          <p>Fase de planificación</p>
          <p className={estilos.pieDetalle}>Equipo · Backlog · Historias</p>
        </div>
      </aside>
    </>
  );
}

export default BarraLateral;
