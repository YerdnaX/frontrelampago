import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as incrementoServicio from '../servicios/incrementoServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import estilos from './IncrementoPagina.module.css';

// Documenta el incremento real del Sprint a partir de historias terminadas.
function IncrementoPagina() {
  const { id: idProyecto, idSprint } = useParams();
  const [datos, setDatos] = useState(null);
  const [formulario, setFormulario] = useState({ resumen: '', observaciones: '' });
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    cargarIncremento();
  }, [idSprint]);

  // Obtiene el incremento y precarga el formulario asociado.
  async function cargarIncremento() {
    setCargando(true);
    setMensajeError('');
    try {
      const respuesta = await incrementoServicio.obtenerIncremento(idSprint);
      setDatos(respuesta);
      setFormulario({
        resumen: respuesta.incremento?.Resumen || '',
        observaciones: respuesta.incremento?.Observaciones || '',
      });
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Guarda o actualiza el resumen del incremento del Sprint.
  async function manejarGuardar(evento) {
    evento.preventDefault();
    setGuardando(true);
    setMensajeError('');
    try {
      const actualizado = await incrementoServicio.guardarIncremento(idSprint, formulario);
      setDatos(actualizado);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando incremento..." />;
  }

  if (!datos) {
    return <div className="contenedor-pagina"><p className="campo-error">{mensajeError || 'No fue posible cargar el incremento.'}</p></div>;
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}`} className={estilos.volver}>← Volver al Sprint</Link>

      <section className={estilos.encabezado}>
        <p className={estilos.etiqueta}>Incremento</p>
        <h1>{datos.sprint.Nombre}</h1>
        <p className={estilos.goal}>“{datos.sprint.SprintGoal}”</p>
      </section>

      {mensajeError && <p className="campo-error">{mensajeError}</p>}

      <div className={estilos.disposicion}>
        <section className={`tarjeta ${estilos.tarjetaHistorias}`}>
          <h2>Historias terminadas</h2>
          {datos.historiasTerminadas.length === 0 ? (
            <EstadoVacio
              icono="📦"
              titulo="Este Sprint todavia no tiene historias terminadas para presentar"
              descripcion="El incremento solo puede documentar historias tecnicamente terminadas."
            />
          ) : (
            <>
              <div className={estilos.listaHistorias}>
                {datos.historiasTerminadas.map((historia) => (
                  <article key={historia.IdHistoria} className={estilos.historia}>
                    <div>
                      <strong>HU-{historia.IdHistoria}</strong>
                      <p>{historia.Titulo}</p>
                    </div>
                    <span>{historia.StoryPoints ?? '—'} pts</span>
                  </article>
                ))}
              </div>
              <div className={estilos.total}>
                <strong>{datos.storyPointsTerminados} Story Points</strong>
                <span>{datos.totalHistoriasTerminadas} historias entregadas</span>
              </div>
            </>
          )}
        </section>

        <form className={`tarjeta ${estilos.tarjetaFormulario}`} onSubmit={manejarGuardar}>
          <h2>Resumen del incremento</h2>
          <div className="campo">
            <label className="campo-etiqueta" htmlFor="resumen-incremento">Resumen</label>
            <textarea
              id="resumen-incremento"
              className="campo-textarea"
              rows={6}
              value={formulario.resumen}
              onChange={(evento) => setFormulario((anterior) => ({ ...anterior, resumen: evento.target.value }))}
            />
          </div>
          <div className="campo">
            <label className="campo-etiqueta" htmlFor="observaciones-incremento">Observaciones</label>
            <textarea
              id="observaciones-incremento"
              className="campo-textarea"
              rows={4}
              value={formulario.observaciones}
              onChange={(evento) => setFormulario((anterior) => ({ ...anterior, observaciones: evento.target.value }))}
            />
          </div>
          <button type="submit" className="boton boton-primario" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar incremento'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default IncrementoPagina;