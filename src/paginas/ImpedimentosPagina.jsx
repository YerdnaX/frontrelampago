import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as sprintsServicio from '../servicios/sprintsServicio';
import * as impedimentosServicio from '../servicios/impedimentosServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import TarjetaImpedimento from '../componentes/TarjetaImpedimento';
import estilos from './ImpedimentosPagina.module.css';

// Pantalla de impedimentos del Sprint: los visualiza y permite dar seguimiento a su estado (HU-081).
function ImpedimentosPagina() {
  const { id: idProyecto, idSprint } = useParams();
  const [sprint, setSprint] = useState(null);
  const [impedimentos, setImpedimentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [descripcionNueva, setDescripcionNueva] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [idSprint]);

  // Carga el Sprint y los impedimentos registrados.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const [datosSprint, listaImpedimentos] = await Promise.all([
        sprintsServicio.obtenerSprintPorId(idSprint),
        impedimentosServicio.obtenerImpedimentosDelSprint(idSprint),
      ]);
      setSprint(datosSprint);
      setImpedimentos(listaImpedimentos);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Registra un nuevo impedimento directamente para el Sprint.
  async function manejarCrearImpedimento(evento) {
    evento.preventDefault();
    if (!descripcionNueva.trim()) return;
    setEnviando(true);
    setMensajeError('');
    try {
      const impedimento = await impedimentosServicio.crearImpedimento(idSprint, descripcionNueva.trim());
      setImpedimentos((anterior) => [impedimento, ...anterior]);
      setDescripcionNueva('');
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviando(false);
    }
  }

  // Actualiza el estado de seguimiento de un impedimento (con reversión ante error).
  async function manejarCambiarEstado(idImpedimento, nuevoEstado) {
    const anterior = impedimentos.find((item) => item.IdImpedimento === idImpedimento);
    setImpedimentos((lista) => lista.map((item) => (item.IdImpedimento === idImpedimento ? { ...item, Estado: nuevoEstado } : item)));
    try {
      await impedimentosServicio.actualizarEstadoImpedimento(idImpedimento, nuevoEstado);
    } catch (error) {
      setImpedimentos((lista) => lista.map((item) => (item.IdImpedimento === idImpedimento ? anterior : item)));
      setMensajeError(extraerMensajeError(error));
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando impedimentos..." />;
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
      <h1>Impedimentos</h1>
      <p className={estilos.ayuda}>Obstáculos que afectan el trabajo del equipo durante este Sprint.</p>

      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      <form className={`tarjeta ${estilos.formularioNuevo}`} onSubmit={manejarCrearImpedimento}>
        <label className="campo-etiqueta" htmlFor="nuevo-impedimento">Reportar un impedimento</label>
        <div className={estilos.filaFormulario}>
          <input
            id="nuevo-impedimento"
            className="campo-entrada"
            placeholder="Ej: No puedo acceder a SQL Server"
            value={descripcionNueva}
            onChange={(evento) => setDescripcionNueva(evento.target.value)}
          />
          <button type="submit" className="boton boton-primario" disabled={enviando}>
            {enviando ? 'Registrando...' : '+ Registrar'}
          </button>
        </div>
      </form>

      {impedimentos.length === 0 ? (
        <EstadoVacio
          icono="🚧"
          titulo="No existen impedimentos abiertos"
          descripcion="El Sprint puede continuar sin bloqueos registrados."
        />
      ) : (
        <div className={estilos.lista}>
          {impedimentos.map((impedimento) => (
            <TarjetaImpedimento key={impedimento.IdImpedimento} impedimento={impedimento} alCambiarEstado={manejarCambiarEstado} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImpedimentosPagina;
