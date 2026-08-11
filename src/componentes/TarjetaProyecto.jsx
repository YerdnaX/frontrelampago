import { Link } from 'react-router-dom';
import estilos from './TarjetaProyecto.module.css';

// Muestra la informacion resumida de un proyecto dentro de una tarjeta.
function TarjetaProyecto({ proyecto }) {
  return (
    <Link to={`/proyectos/${proyecto.IdProyecto}`} className={`tarjeta ${estilos.tarjeta}`}>
      <div className={estilos.encabezado}>
        <h3>{proyecto.Nombre}</h3>
        <span className="insignia" style={{ background: 'var(--color-primario-suave)', color: 'var(--color-primario-fuerte)' }}>
          {proyecto.TotalHistorias ?? 0} historias
        </span>
      </div>
      {proyecto.Descripcion && <p className={estilos.descripcion}>{proyecto.Descripcion}</p>}
      <div className={estilos.meta}>
        <span>◔ {proyecto.NombreEquipo}</span>
        <span>◧ {proyecto.NombreProductOwner}</span>
      </div>
    </Link>
  );
}

export default TarjetaProyecto;
