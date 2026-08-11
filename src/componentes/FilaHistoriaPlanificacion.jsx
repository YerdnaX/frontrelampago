import EtiquetaPrioridad from './EtiquetaPrioridad';
import estilos from './FilaHistoriaPlanificacion.module.css';

// Fila del Product Backlog dentro de Sprint Planning: permite a los Developers
// seleccionar (o quitar) una historia para comprometerla en el Sprint.
function FilaHistoriaPlanificacion({ historia, seleccionada, alCambiar }) {
  return (
    <label className={`${estilos.fila} ${seleccionada ? estilos.seleccionada : ''}`}>
      <input
        type="checkbox"
        checked={seleccionada}
        onChange={(evento) => alCambiar(historia.IdHistoria, evento.target.checked)}
        aria-label={`Seleccionar ${historia.Titulo}`}
      />
      <div className={estilos.cuerpo}>
        <span className={estilos.titulo}>{historia.Titulo}</span>
        <span className={estilos.narrativa}>
          Como {historia.Actor}, quiero {historia.Necesidad}.
        </span>
      </div>
      <EtiquetaPrioridad prioridad={historia.Prioridad} />
      <span className="insignia" style={{ background: 'var(--color-superficie-alterna)', color: 'var(--color-texto-suave)' }}>
        {historia.StoryPoints ?? '—'} pts
      </span>
    </label>
  );
}

export default FilaHistoriaPlanificacion;
