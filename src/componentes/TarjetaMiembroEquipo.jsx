import estilos from './TarjetaMiembroEquipo.module.css';

const ICONO_POR_ROL = { 'Product Owner': '★', 'Scrum Master': '◎', Developer: '◈' };

// Muestra un miembro del equipo junto con su rol Scrum.
function TarjetaMiembroEquipo({ miembro }) {
  return (
    <div className={estilos.tarjeta}>
      <span className={estilos.avatar} aria-hidden="true">
        {miembro.Nombre.slice(0, 1).toUpperCase()}
      </span>
      <div className={estilos.info}>
        <span className={estilos.nombre}>{miembro.Nombre}</span>
        <span className={estilos.correo}>{miembro.Correo}</span>
      </div>
      <span className={estilos.rol}>
        <span aria-hidden="true">{ICONO_POR_ROL[miembro.RolScrum] || '•'}</span>
        {miembro.RolScrum}
      </span>
    </div>
  );
}

export default TarjetaMiembroEquipo;
