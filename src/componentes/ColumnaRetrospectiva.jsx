import { useState } from 'react';
import estilos from './ColumnaRetrospectiva.module.css';

// Muestra una columna editable de la retrospectiva con sus aportes.
function ColumnaRetrospectiva({ titulo, descripcion, items, tipo, alAgregar }) {
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Registra un nuevo aporte en la columna actual.
  async function manejarAgregar(evento) {
    evento.preventDefault();
    if (!texto.trim()) return;
    setEnviando(true);
    try {
      await alAgregar(tipo, texto.trim());
      setTexto('');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className={`tarjeta ${estilos.columna}`}>
      <div>
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
      </div>

      <div className={estilos.lista}>
        {items.length === 0 ? (
          <p className={estilos.vacio}>Todavia no se han registrado aportes.</p>
        ) : (
          items.map((item) => (
            <article key={item.IdElemento} className={estilos.item}>
              <p>{item.Descripcion}</p>
              <span>{item.NombreUsuario || 'Equipo Scrum'}</span>
            </article>
          ))
        )}
      </div>

      <form className={estilos.formulario} onSubmit={manejarAgregar}>
        <textarea
          className="campo-textarea"
          rows={3}
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
          placeholder="Agregar aporte"
        />
        <button type="submit" className="boton boton-secundario" disabled={enviando}>
          {enviando ? 'Guardando...' : '+ Agregar'}
        </button>
      </form>
    </section>
  );
}

export default ColumnaRetrospectiva;