import { useState } from 'react';
import estilos from './FormularioDaily.module.css';

// Formulario breve del Daily Scrum: avance, siguiente trabajo e impedimento opcional.
function FormularioDaily({ alGuardar, enviando }) {
  const [avance, setAvance] = useState('');
  const [siguienteTrabajo, setSiguienteTrabajo] = useState('');
  const [tieneImpedimento, setTieneImpedimento] = useState(false);
  const [impedimento, setImpedimento] = useState('');
  const [errores, setErrores] = useState({});

  // Valida los campos obligatorios del Daily.
  function validar() {
    const erroresEncontrados = {};
    if (!avance.trim()) erroresEncontrados.avance = 'Cuéntanos qué avanzaste.';
    if (!siguienteTrabajo.trim()) erroresEncontrados.siguienteTrabajo = 'Indica qué harás ahora.';
    if (tieneImpedimento && !impedimento.trim()) erroresEncontrados.impedimento = 'Describe el impedimento.';
    setErrores(erroresEncontrados);
    return Object.keys(erroresEncontrados).length === 0;
  }

  // Valida y envia la actualizacion Daily (con impedimento si aplica).
  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!validar()) return;
    alGuardar({
      avance: avance.trim(),
      siguienteTrabajo: siguienteTrabajo.trim(),
      tieneImpedimento,
      impedimento: tieneImpedimento ? impedimento.trim() : undefined,
    });
  }

  return (
    <form className={estilos.formulario} onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="avance-daily">¿Qué avancé?</label>
        <textarea
          id="avance-daily"
          className="campo-textarea"
          value={avance}
          onChange={(evento) => setAvance(evento.target.value)}
          rows={2}
        />
        {errores.avance && <span className="campo-error">{errores.avance}</span>}
      </div>

      <div className="campo">
        <label className="campo-etiqueta" htmlFor="siguiente-daily">¿Qué haré ahora?</label>
        <textarea
          id="siguiente-daily"
          className="campo-textarea"
          value={siguienteTrabajo}
          onChange={(evento) => setSiguienteTrabajo(evento.target.value)}
          rows={2}
        />
        {errores.siguienteTrabajo && <span className="campo-error">{errores.siguienteTrabajo}</span>}
      </div>

      <div className="campo">
        <span className="campo-etiqueta">¿Existe algún impedimento?</span>
        <div className={estilos.opciones} role="radiogroup" aria-label="¿Existe algún impedimento?">
          <button
            type="button"
            role="radio"
            aria-checked={!tieneImpedimento}
            className={`${estilos.opcion} ${!tieneImpedimento ? estilos.seleccionado : ''}`}
            onClick={() => setTieneImpedimento(false)}
          >
            No
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={tieneImpedimento}
            className={`${estilos.opcion} ${tieneImpedimento ? estilos.seleccionadoPeligro : ''}`}
            onClick={() => setTieneImpedimento(true)}
          >
            Sí
          </button>
        </div>
      </div>

      {tieneImpedimento && (
        <div className={`campo ${estilos.bloqueImpedimento}`}>
          <label className="campo-etiqueta" htmlFor="descripcion-impedimento">Descripción del impedimento</label>
          <textarea
            id="descripcion-impedimento"
            className="campo-textarea"
            placeholder="Ej: No puedo conectarme a SQL Server."
            value={impedimento}
            onChange={(evento) => setImpedimento(evento.target.value)}
            rows={2}
          />
          {errores.impedimento && <span className="campo-error">{errores.impedimento}</span>}
        </div>
      )}

      <button type="submit" className="boton boton-primario" disabled={enviando}>
        {enviando ? 'Registrando...' : tieneImpedimento ? 'Registrar Daily e impedimento' : 'Registrar actualización'}
      </button>
    </form>
  );
}

export default FormularioDaily;
