import { Link } from 'react-router-dom';
import EtiquetaPrioridad from './EtiquetaPrioridad';
import estilos from './TarjetaHistoria.module.css';

// Muestra una historia de usuario dentro del Product Backlog.
function TarjetaHistoria({ historia, posicion, total, alMover }) {
  return (
    <div className={`tarjeta ${estilos.tarjeta}`}>
      <div className={estilos.controlesOrden}>
        <button
          type="button"
          className="boton-icono"
          onClick={() => alMover('arriba')}
          disabled={posicion === 0}
          aria-label="Subir historia en el backlog"
        >
          ▲
        </button>
        <span className={estilos.numero}>#{posicion + 1}</span>
        <button
          type="button"
          className="boton-icono"
          onClick={() => alMover('abajo')}
          disabled={posicion === total - 1}
          aria-label="Bajar historia en el backlog"
        >
          ▼
        </button>
      </div>

      <div className={estilos.cuerpo}>
        <Link to={`historias/${historia.IdHistoria}`} className={estilos.titulo}>
          {historia.Titulo}
        </Link>
        <p className={estilos.narrativa}>
          Como <strong>{historia.Actor}</strong>, quiero {historia.Necesidad}, para {historia.Beneficio}.
        </p>
        <div className={estilos.pie}>
          <EtiquetaPrioridad prioridad={historia.Prioridad} />
          <span className="insignia" style={{ background: 'var(--color-superficie-alterna)', color: 'var(--color-texto-suave)' }}>
            {historia.StoryPoints ?? '—'} pts
          </span>
          <span className="insignia" style={{ background: 'var(--color-exito-suave)', color: 'var(--color-exito)' }}>
            {historia.TotalCriterios ?? 0} criterios
          </span>
        </div>
      </div>

      <Link to={`historias/${historia.IdHistoria}`} className="boton boton-secundario boton-pequeno">
        Editar
      </Link>
    </div>
  );
}

export default TarjetaHistoria;
