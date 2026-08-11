import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as sprintsServicio from '../servicios/sprintsServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import IndicadorCumplimiento from '../componentes/IndicadorCumplimiento';
import ResumenCierreSprint from '../componentes/ResumenCierreSprint';
import ModalConfirmacion from '../componentes/ModalConfirmacion';
import estilos from './CierreSprintPagina.module.css';

// Presenta el resumen final del Sprint y ejecuta su cierre formal.
function CierreSprintPagina() {
  const { id: idProyecto, idSprint } = useParams();
  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cerrando, setCerrando] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    cargarResumen();
  }, [idSprint]);

  // Obtiene el resumen previo al cierre del Sprint.
  async function cargarResumen() {
    setCargando(true);
    setMensajeError('');
    try {
      setResumen(await sprintsServicio.obtenerResumenCierreSprint(idSprint));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Ejecuta el cierre formal del Sprint mediante la API.
  async function manejarCerrarSprint() {
    setCerrando(true);
    setMensajeError('');
    try {
      const actualizado = await sprintsServicio.cerrarSprint(idSprint);
      setResumen(actualizado);
      setMostrarConfirmacion(false);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
      setMostrarConfirmacion(false);
    } finally {
      setCerrando(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando resumen del Sprint..." />;
  }

  if (!resumen) {
    return <div className="contenedor-pagina"><p className="campo-error">{mensajeError || 'No fue posible cargar el cierre del Sprint.'}</p></div>;
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}`} className={estilos.volver}>← Volver al Sprint</Link>

      <section className={estilos.encabezado}>
        <p className={estilos.etiqueta}>Resultado del Sprint</p>
        <h1>{resumen.sprint.Nombre}</h1>
        <p>Revisa el resumen final, verifica la Review y la Retrospectiva, y cierra el Sprint cuando el ciclo este listo.</p>
      </section>

      {mensajeError && <p className="campo-error">{mensajeError}</p>}

      <div className={estilos.disposicion}>
        <IndicadorCumplimiento cumplimiento={resumen} titulo="Cumplimiento" />
        <ResumenCierreSprint resumen={resumen} alCerrar={() => setMostrarConfirmacion(true)} cargandoCierre={cerrando} />
      </div>

      <section className={estilos.accesos}>
        <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/incremento`} className="boton boton-secundario">Ver incremento</Link>
        <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/review`} className="boton boton-secundario">Ver Review</Link>
        <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}/retrospectiva`} className="boton boton-secundario">Ver Retrospectiva</Link>
      </section>

      {mostrarConfirmacion && (
        <ModalConfirmacion
          titulo={`Cerrar ${resumen.sprint.Nombre}`}
          mensaje="Esta accion marcara el Sprint como Finalizado, manteniendo visibles las historias no terminadas tal como quedaron al cerrar el ciclo."
          textoConfirmar="Cerrar Sprint"
          alCancelar={() => setMostrarConfirmacion(false)}
          alConfirmar={manejarCerrarSprint}
        />
      )}
    </div>
  );
}

export default CierreSprintPagina;