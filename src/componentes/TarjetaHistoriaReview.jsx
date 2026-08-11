import { useEffect, useState } from 'react';
import { RESULTADOS_REVIEW } from '../constantes/constantes';
import estilos from './TarjetaHistoriaReview.module.css';

// Permite registrar la decision del Product Owner por cada historia terminada.
function TarjetaHistoriaReview({ historia, revision, alGuardar }) {
  const [resultado, setResultado] = useState(revision?.Resultado || RESULTADOS_REVIEW[0]);
  const [comentario, setComentario] = useState(revision?.Comentario || '');
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setResultado(revision?.Resultado || RESULTADOS_REVIEW[0]);
    setComentario(revision?.Comentario || '');
  }, [revision]);

  // Guarda el resultado actual de la historia dentro de la Sprint Review.
  async function manejarGuardar() {
    setGuardando(true);
    try {
      await alGuardar(historia.IdHistoria, { resultado, comentario });
    } finally {
      setGuardando(false);
    }
  }

  return (
    <article className={`tarjeta ${estilos.tarjeta}`}>
      <div className={estilos.encabezado}>
        <div>
          <strong>HU-{historia.IdHistoria}</strong>
          <h3>{historia.Titulo}</h3>
        </div>
        <span className="insignia" style={{ background: 'var(--color-superficie-alterna)', color: 'var(--color-texto-suave)' }}>
          {historia.StoryPoints ?? '—'} pts
        </span>
      </div>

      <p className={estilos.estadoTecnico}>Estado tecnico: {historia.Estado}</p>

      <div className={estilos.resultados} role="radiogroup" aria-label={`Resultado de la historia ${historia.Titulo}`}>
        {RESULTADOS_REVIEW.map((opcion) => (
          <button
            key={opcion}
            type="button"
            className={`${estilos.opcion} ${resultado === opcion ? estilos.opcionActiva : ''}`}
            onClick={() => setResultado(opcion)}
          >
            {opcion}
          </button>
        ))}
      </div>

      <div className="campo">
        <label className="campo-etiqueta" htmlFor={`comentario-${historia.IdHistoria}`}>Comentario</label>
        <textarea
          id={`comentario-${historia.IdHistoria}`}
          className="campo-textarea"
          rows={3}
          value={comentario}
          onChange={(evento) => setComentario(evento.target.value)}
        />
      </div>

      <button type="button" className="boton boton-primario" onClick={manejarGuardar} disabled={guardando}>
        {guardando ? 'Guardando...' : 'Guardar decision'}
      </button>
    </article>
  );
}

export default TarjetaHistoriaReview;