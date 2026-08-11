import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as sprintsServicio from '../servicios/sprintsServicio';
import * as dailyServicio from '../servicios/dailyServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import FormularioDaily from '../componentes/FormularioDaily';
import estilos from './DailyPagina.module.css';

// Formatea fecha y hora de un Daily de forma corta y legible.
function formatearFechaHora(fecha) {
  return new Date(fecha).toLocaleString('es-CR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// Pantalla del Daily Scrum: registra la actualizacion diaria del usuario autenticado
// y permite reportar un impedimento sin salir del formulario (HU-074/HU-077).
function DailyPagina() {
  const { id: idProyecto, idSprint } = useParams();
  const [sprint, setSprint] = useState(null);
  const [dailies, setDailies] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [idSprint]);

  // Carga el Sprint y las actualizaciones Daily ya registradas.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const [datosSprint, listaDailies] = await Promise.all([
        sprintsServicio.obtenerSprintPorId(idSprint),
        dailyServicio.obtenerDailiesDelSprint(idSprint),
      ]);
      setSprint(datosSprint);
      setDailies(listaDailies);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Registra el Daily (y el impedimento, si el usuario reportó uno).
  async function manejarRegistrarDaily(datos) {
    setEnviando(true);
    setMensajeError('');
    try {
      await dailyServicio.registrarDaily(idSprint, datos);
      setMensajeExito(datos.tieneImpedimento ? 'Daily e impedimento registrados correctamente.' : 'Actualización registrada correctamente.');
      await cargarDatos();
      setTimeout(() => setMensajeExito(''), 3500);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviando(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando Daily Scrum..." />;
  }

  if (!sprint) {
    return (
      <div className="contenedor-pagina">
        <p className="campo-error">{mensajeError || 'El Sprint no existe.'}</p>
      </div>
    );
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}`} className={estilos.volver}>← {sprint.Nombre}</Link>
      <h1>Daily Scrum</h1>
      <p className={estilos.ayuda}>Registra tu actualización diaria del Sprint.</p>

      {mensajeExito && <p className={estilos.mensajeExito}>{mensajeExito}</p>}
      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      <div className={estilos.disposicion}>
        <section className={`tarjeta ${estilos.seccion}`}>
          <FormularioDaily alGuardar={manejarRegistrarDaily} enviando={enviando} />
        </section>

        <section className={estilos.historial}>
          <h2>Actualizaciones del Sprint</h2>
          {dailies.length === 0 ? (
            <EstadoVacio icono="🗣" titulo="Todavía no hay actualizaciones" descripcion="Registra el primer Daily del Sprint." />
          ) : (
            <div className={estilos.lista}>
              {dailies.map((daily) => (
                <div key={daily.IdDaily} className={`tarjeta ${estilos.tarjetaDaily}`}>
                  <div className={estilos.encabezadoDaily}>
                    <strong>{daily.NombreUsuario}</strong>
                    <span className={estilos.fecha}>{formatearFechaHora(daily.Fecha)}</span>
                  </div>
                  <p><span className={estilos.etiquetaCampo}>Avanzó:</span> {daily.Avance}</p>
                  <p><span className={estilos.etiquetaCampo}>Hará ahora:</span> {daily.SiguienteTrabajo}</p>
                  {daily.TieneImpedimento && <span className={estilos.badgeImpedimento}>🚧 Reportó un impedimento</span>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DailyPagina;
