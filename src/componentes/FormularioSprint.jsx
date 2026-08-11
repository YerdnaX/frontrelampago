import { useState } from 'react';
import estilos from './FormularioSprint.module.css';

// Formulario para crear un nuevo Sprint dentro de un proyecto.
function FormularioSprint({ alGuardar, alCancelar, enviando }) {
  const [nombre, setNombre] = useState('');
  const [sprintGoal, setSprintGoal] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [errores, setErrores] = useState({});

  // Valida los campos obligatorios del Sprint.
  function validar() {
    const erroresEncontrados = {};
    if (!nombre.trim()) erroresEncontrados.nombre = 'El nombre del Sprint es obligatorio.';
    if (!sprintGoal.trim()) erroresEncontrados.sprintGoal = 'El Sprint Goal es obligatorio.';
    if (!fechaInicio) erroresEncontrados.fechaInicio = 'La fecha de inicio es obligatoria.';
    if (!fechaFin) erroresEncontrados.fechaFin = 'La fecha de finalización es obligatoria.';
    if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
      erroresEncontrados.fechaFin = 'La fecha final no puede ser anterior a la fecha inicial.';
    }
    setErrores(erroresEncontrados);
    return Object.keys(erroresEncontrados).length === 0;
  }

  // Valida y envia los datos del nuevo Sprint.
  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!validar()) return;
    alGuardar({ nombre: nombre.trim(), sprintGoal: sprintGoal.trim(), fechaInicio, fechaFin });
  }

  return (
    <form className={estilos.formulario} onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="nombre-sprint">Nombre del Sprint</label>
        <input
          id="nombre-sprint"
          className="campo-entrada"
          placeholder="Ej: Sprint 01"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
        />
        {errores.nombre && <span className="campo-error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label className="campo-etiqueta" htmlFor="goal-sprint">Sprint Goal</label>
        <textarea
          id="goal-sprint"
          className="campo-textarea"
          placeholder="Ej: Completar la gestión inicial del Product Backlog."
          value={sprintGoal}
          onChange={(evento) => setSprintGoal(evento.target.value)}
          rows={3}
        />
        {errores.sprintGoal && <span className="campo-error">{errores.sprintGoal}</span>}
      </div>

      <div className={estilos.filaFechas}>
        <div className="campo">
          <label className="campo-etiqueta" htmlFor="inicio-sprint">Fecha de inicio</label>
          <input
            id="inicio-sprint"
            type="date"
            className="campo-entrada"
            value={fechaInicio}
            onChange={(evento) => setFechaInicio(evento.target.value)}
          />
          {errores.fechaInicio && <span className="campo-error">{errores.fechaInicio}</span>}
        </div>
        <div className="campo">
          <label className="campo-etiqueta" htmlFor="fin-sprint">Fecha de finalización</label>
          <input
            id="fin-sprint"
            type="date"
            className="campo-entrada"
            value={fechaFin}
            onChange={(evento) => setFechaFin(evento.target.value)}
          />
          {errores.fechaFin && <span className="campo-error">{errores.fechaFin}</span>}
        </div>
      </div>

      <div className="fila" style={{ gap: 'var(--espacio-2)' }}>
        <button type="submit" className="boton boton-primario" disabled={enviando}>
          {enviando ? 'Creando...' : 'Crear Sprint'}
        </button>
        {alCancelar && (
          <button type="button" className="boton boton-fantasma" onClick={alCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioSprint;
