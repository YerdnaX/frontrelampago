import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAutenticacion } from '../hooks/useAutenticacion';
import * as reviewServicio from '../servicios/reviewServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import TarjetaHistoriaReview from '../componentes/TarjetaHistoriaReview';
import FormularioFeedback from '../componentes/FormularioFeedback';
import estilos from './SprintReviewPagina.module.css';

// Registra la Sprint Review con validacion de historias y feedback.
function SprintReviewPagina() {
  const { id: idProyecto, idSprint } = useParams();
  const { usuario } = useAutenticacion();
  const [datos, setDatos] = useState(null);
  const [resumen, setResumen] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardandoResumen, setGuardandoResumen] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    cargarReview();
  }, [idSprint]);

  // Obtiene la Review actual del Sprint.
  async function cargarReview() {
    setCargando(true);
    setMensajeError('');
    try {
      const respuesta = await reviewServicio.obtenerReview(idSprint);
      setDatos(respuesta);
      setResumen(respuesta.review?.Resumen || '');
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Guarda el resumen principal de la Sprint Review.
  async function manejarGuardarResumen(evento) {
    evento.preventDefault();
    setGuardandoResumen(true);
    try {
      const respuesta = datos.review
        ? await reviewServicio.actualizarReview(idSprint, resumen)
        : await reviewServicio.guardarReview(idSprint, resumen);
      setDatos(respuesta);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setGuardandoResumen(false);
    }
  }

  // Guarda la decision del Product Owner para una historia presentada.
  async function manejarGuardarHistoria(idHistoria, payload) {
    const respuesta = await reviewServicio.registrarRevisionHistoria(idSprint, idHistoria, payload);
    setDatos(respuesta);
  }

  // Registra una nueva entrada de feedback en la Review.
  async function manejarRegistrarFeedback(payload) {
    const respuesta = await reviewServicio.registrarFeedbackReview(idSprint, payload);
    setDatos(respuesta);
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando Sprint Review..." />;
  }

  if (!datos) {
    return <div className="contenedor-pagina"><p className="campo-error">{mensajeError || 'No fue posible cargar la Sprint Review.'}</p></div>;
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}`} className={estilos.volver}>← Volver al Sprint</Link>

      <div className={estilos.encabezado}>
        <p className={estilos.etiqueta}>Sprint Review</p>
        <h1>Inspeccion del incremento</h1>
        <p>Presenta las historias terminadas, registra el resultado del Product Owner y captura feedback real.</p>
      </div>

      {mensajeError && <p className="campo-error">{mensajeError}</p>}

      <div className={estilos.disposicion}>
        <form className={`tarjeta ${estilos.tarjetaResumen}`} onSubmit={manejarGuardarResumen}>
          <h2>Resumen de la Review</h2>
          <textarea className="campo-textarea" rows={5} value={resumen} onChange={(evento) => setResumen(evento.target.value)} />
          <button type="submit" className="boton boton-primario" disabled={guardandoResumen}>
            {guardandoResumen ? 'Guardando...' : 'Guardar review'}
          </button>
        </form>

        <section className={`tarjeta ${estilos.tarjetaFeedback}`}>
          <h2>Feedback</h2>
          <FormularioFeedback autorInicial={usuario?.nombre || usuario?.Nombre || ''} alRegistrar={manejarRegistrarFeedback} />
          <div className={estilos.listaFeedback}>
            {datos.feedback.length === 0 ? (
              <p className={estilos.vacio}>Aun no se ha registrado feedback.</p>
            ) : (
              datos.feedback.map((item) => (
                <article key={item.IdFeedback} className={estilos.feedback}>
                  <strong>{item.Autor || item.NombreUsuario || 'Stakeholder'}</strong>
                  <p>{item.Comentario}</p>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      <section className={estilos.historias}>
        <div className={estilos.subencabezado}>
          <h2>Historias presentadas</h2>
          <span>{datos.historiasTerminadas.length} terminadas</span>
        </div>

        {datos.historiasTerminadas.length === 0 ? (
          <EstadoVacio
            icono="🧪"
            titulo="Este Sprint todavia no tiene historias terminadas para presentar"
            descripcion="La Review se alimenta unicamente de historias tecnicamente terminadas."
          />
        ) : (
          <div className={estilos.grillaHistorias}>
            {datos.historiasTerminadas.map((historia) => {
              const revision = datos.historiasRevision.find((item) => item.IdHistoria === historia.IdHistoria);
              return <TarjetaHistoriaReview key={historia.IdHistoria} historia={historia} revision={revision} alGuardar={manejarGuardarHistoria} />;
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default SprintReviewPagina;