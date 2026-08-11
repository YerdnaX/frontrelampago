import { useState } from 'react';
import estilos from './SprintGoalDestacado.module.css';

// Calcula los dias restantes hasta la fecha de fin del Sprint (nunca negativo en la etiqueta).
function calcularDiasRestantes(fechaFin) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fin = new Date(fechaFin);
  fin.setHours(0, 0, 0, 0);
  return Math.round((fin - hoy) / (1000 * 60 * 60 * 24));
}

// Muestra el Sprint Goal de forma prominente y permite editarlo en linea.
function SprintGoalDestacado({ sprint, alGuardarGoal }) {
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState(sprint.SprintGoal || '');
  const [enviando, setEnviando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const diasRestantes = calcularDiasRestantes(sprint.FechaFin);

  // Envia el nuevo texto del Sprint Goal al componente padre.
  async function manejarGuardar(evento) {
    evento.preventDefault();
    if (!texto.trim()) {
      setMensajeError('El Sprint Goal es obligatorio.');
      return;
    }
    setEnviando(true);
    setMensajeError('');
    try {
      await alGuardarGoal(texto.trim());
      setEditando(false);
    } catch (error) {
      setMensajeError('No fue posible guardar el Sprint Goal.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className={estilos.tarjeta}>
      <div className={estilos.encabezado}>
        <div>
          <span className={estilos.etiquetaSprint}>{sprint.Nombre}</span>
          <h2 className={estilos.tituloGoal}>Sprint Goal</h2>
        </div>
        <div className={estilos.metaDerecha}>
          {Number.isFinite(diasRestantes) && sprint.Estado !== 'Finalizado' && (
            <span className={estilos.dias}>
              {diasRestantes >= 0 ? `${diasRestantes} días restantes` : 'Sprint vencido'}
            </span>
          )}
          {!editando && alGuardarGoal && (
            <button type="button" className="boton boton-fantasma boton-pequeno" onClick={() => setEditando(true)}>
              Editar
            </button>
          )}
        </div>
      </div>

      {editando ? (
        <form onSubmit={manejarGuardar} className={estilos.formulario}>
          <textarea
            className="campo-textarea"
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            rows={2}
            autoFocus
          />
          {mensajeError && <span className="campo-error">{mensajeError}</span>}
          <div className="fila" style={{ gap: 'var(--espacio-2)' }}>
            <button type="submit" className="boton boton-primario boton-pequeno" disabled={enviando}>
              {enviando ? 'Guardando...' : 'Guardar Sprint Goal'}
            </button>
            <button type="button" className="boton boton-fantasma boton-pequeno" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <p className={estilos.textoGoal}>“{sprint.SprintGoal}”</p>
      )}
    </section>
  );
}

export default SprintGoalDestacado;
