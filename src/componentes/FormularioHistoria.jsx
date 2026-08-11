import { useState } from 'react';
import SelectorPrioridad from './SelectorPrioridad';
import SelectorStoryPoints from './SelectorStoryPoints';
import estilos from './FormularioHistoria.module.css';

const VALORES_INICIALES = { titulo: '', actor: '', necesidad: '', beneficio: '', prioridad: 'Media', storyPoints: null };

// Formulario progresivo para crear o editar una historia de usuario en formato Como/Quiero/Para.
function FormularioHistoria({ valoresIniciales = VALORES_INICIALES, alGuardar, enviando, textoBoton = 'Guardar historia' }) {
  const [datos, setDatos] = useState({ ...VALORES_INICIALES, ...valoresIniciales });
  const [errores, setErrores] = useState({});

  // Actualiza un campo especifico del formulario.
  function actualizarCampo(campo, valor) {
    setDatos((anterior) => ({ ...anterior, [campo]: valor }));
    setErrores((anterior) => ({ ...anterior, [campo]: null }));
  }

  // Valida los campos obligatorios antes de enviar el formulario.
  function validar() {
    const erroresEncontrados = {};
    if (!datos.titulo.trim()) erroresEncontrados.titulo = 'El título es obligatorio.';
    if (!datos.actor.trim()) erroresEncontrados.actor = 'Indica quién necesita esta historia.';
    if (!datos.necesidad.trim()) erroresEncontrados.necesidad = 'Indica qué necesita.';
    if (!datos.beneficio.trim()) erroresEncontrados.beneficio = 'Indica para qué lo necesita.';
    setErrores(erroresEncontrados);
    return Object.keys(erroresEncontrados).length === 0;
  }

  // Valida y envia los datos de la historia al componente padre.
  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!validar()) return;
    alGuardar(datos);
  }

  return (
    <form className={estilos.formulario} onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="titulo-historia">Título</label>
        <input
          id="titulo-historia"
          className="campo-entrada"
          placeholder="Ej: Inicio de sesión"
          value={datos.titulo}
          onChange={(evento) => actualizarCampo('titulo', evento.target.value)}
        />
        {errores.titulo && <span className="campo-error">{errores.titulo}</span>}
      </div>

      <div className={estilos.narrativa}>
        <div className="campo">
          <label className="campo-etiqueta" htmlFor="actor-historia">Como</label>
          <input
            id="actor-historia"
            className="campo-entrada"
            placeholder="Product Owner"
            value={datos.actor}
            onChange={(evento) => actualizarCampo('actor', evento.target.value)}
          />
          {errores.actor && <span className="campo-error">{errores.actor}</span>}
        </div>

        <div className="campo">
          <label className="campo-etiqueta" htmlFor="necesidad-historia">Quiero</label>
          <input
            id="necesidad-historia"
            className="campo-entrada"
            placeholder="organizar las historias del backlog"
            value={datos.necesidad}
            onChange={(evento) => actualizarCampo('necesidad', evento.target.value)}
          />
          {errores.necesidad && <span className="campo-error">{errores.necesidad}</span>}
        </div>

        <div className="campo">
          <label className="campo-etiqueta" htmlFor="beneficio-historia">Para</label>
          <input
            id="beneficio-historia"
            className="campo-entrada"
            placeholder="priorizar el trabajo del equipo"
            value={datos.beneficio}
            onChange={(evento) => actualizarCampo('beneficio', evento.target.value)}
          />
          {errores.beneficio && <span className="campo-error">{errores.beneficio}</span>}
        </div>
      </div>

      <div className={estilos.vistaPrevia}>
        Como <strong>{datos.actor || '…'}</strong>, quiero {datos.necesidad || '…'}, para {datos.beneficio || '…'}.
      </div>

      <div className="campo">
        <span className="campo-etiqueta">Prioridad</span>
        <SelectorPrioridad valor={datos.prioridad} alCambiar={(valor) => actualizarCampo('prioridad', valor)} />
      </div>

      <div className="campo">
        <span className="campo-etiqueta">Story Points</span>
        <SelectorStoryPoints valor={datos.storyPoints} alCambiar={(valor) => actualizarCampo('storyPoints', valor)} />
      </div>

      <button type="submit" className="boton boton-primario" disabled={enviando}>
        {enviando ? 'Guardando...' : textoBoton}
      </button>
    </form>
  );
}

export default FormularioHistoria;
