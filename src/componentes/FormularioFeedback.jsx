import { useState } from 'react';
import estilos from './FormularioFeedback.module.css';

// Captura feedback libre durante la Sprint Review.
function FormularioFeedback({ autorInicial = '', alRegistrar }) {
  const [autor, setAutor] = useState(autorInicial);
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Registra un nuevo feedback y limpia el formulario.
  async function manejarEnvio(evento) {
    evento.preventDefault();
    if (!comentario.trim()) return;
    setEnviando(true);
    try {
      await alRegistrar({ autor: autor.trim(), comentario: comentario.trim() });
      setComentario('');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className={estilos.formulario} onSubmit={manejarEnvio}>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="autor-feedback">Autor o nombre</label>
        <input id="autor-feedback" className="campo-entrada" value={autor} onChange={(evento) => setAutor(evento.target.value)} />
      </div>

      <div className="campo">
        <label className="campo-etiqueta" htmlFor="comentario-feedback">Feedback</label>
        <textarea
          id="comentario-feedback"
          className="campo-textarea"
          rows={3}
          value={comentario}
          onChange={(evento) => setComentario(evento.target.value)}
          placeholder="Ej: Seria util mostrar filtros por prioridad."
        />
      </div>

      <button type="submit" className="boton boton-primario" disabled={enviando}>
        {enviando ? 'Registrando...' : 'Registrar feedback'}
      </button>
    </form>
  );
}

export default FormularioFeedback;