import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as proyectosServicio from '../servicios/proyectosServicio';
import * as equiposServicio from '../servicios/equiposServicio';
import * as historiasServicio from '../servicios/historiasServicio';
import * as sprintsServicio from '../servicios/sprintsServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import TarjetaMiembroEquipo from '../componentes/TarjetaMiembroEquipo';
import estilos from './ProyectoDetallePagina.module.css';

// Pantalla principal de un proyecto: Product Goal, equipo y accesos al backlog.
function ProyectoDetallePagina() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [equipo, setEquipo] = useState(null);
  const [totalHistorias, setTotalHistorias] = useState(0);
  const [sprints, setSprints] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [editandoGoal, setEditandoGoal] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [id]);

  // Carga el proyecto, su equipo, el backlog y los Sprints existentes.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const datosProyecto = await proyectosServicio.obtenerProyectoPorId(id);
      const [datosEquipo, historias, listaSprints] = await Promise.all([
        equiposServicio.obtenerEquipoPorId(datosProyecto.IdEquipo),
        historiasServicio.obtenerHistoriasDelProyecto(id),
        sprintsServicio.obtenerSprintsDelProyecto(id),
      ]);
      setProyecto(datosProyecto);
      setEquipo(datosEquipo);
      setTotalHistorias(historias.length);
      setSprints(listaSprints);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  const sprintActivo = sprints.find((sprint) => sprint.Estado === 'Activo') || sprints[0];

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando proyecto..." />;
  }

  if (!proyecto) {
    return (
      <div className="contenedor-pagina">
        <p className="campo-error">{mensajeError || 'El proyecto no existe.'}</p>
      </div>
    );
  }

  return (
    <div className="contenedor-pagina">
      <Link to="/proyectos" className={estilos.volver}>← Volver a proyectos</Link>
      <h1>{proyecto.Nombre}</h1>
      {proyecto.Descripcion && <p className={estilos.descripcion}>{proyecto.Descripcion}</p>}

      <section className={`${estilos.tarjetaGoal}`}>
        <div className={estilos.encabezadoGoal}>
          <h2>🎯 Product Goal</h2>
          {!editandoGoal && (
            <button type="button" className="boton boton-fantasma boton-pequeno" onClick={() => setEditandoGoal(true)}>
              Editar
            </button>
          )}
        </div>

        {editandoGoal ? (
          <FormularioProductGoal
            proyecto={proyecto}
            alGuardar={async (productGoal) => {
              const actualizado = await proyectosServicio.actualizarProyecto(id, {
                nombre: proyecto.Nombre,
                descripcion: proyecto.Descripcion,
                productGoal,
              });
              setProyecto((anterior) => ({ ...anterior, ProductGoal: actualizado.ProductGoal }));
              setEditandoGoal(false);
            }}
            alCancelar={() => setEditandoGoal(false)}
          />
        ) : proyecto.ProductGoal ? (
          <p className={estilos.textoGoal}>“{proyecto.ProductGoal}”</p>
        ) : (
          <p className={estilos.textoGoalVacio}>Este proyecto todavía no tiene un Product Goal definido.</p>
        )}
      </section>

      <div className={estilos.disposicion}>
        <section className={`tarjeta ${estilos.seccion}`}>
          <div className={estilos.encabezadoSeccion}>
            <h2>Equipo Scrum</h2>
            <Link to={`/equipos/${proyecto.IdEquipo}`} className={estilos.enlaceSecundario}>Ver equipo completo →</Link>
          </div>
          <p className={estilos.nombreEquipo}>{proyecto.NombreEquipo}</p>
          <div className={estilos.listaMiembros}>
            {equipo?.miembros?.length ? (
              equipo.miembros.map((miembro) => <TarjetaMiembroEquipo key={miembro.IdEquipoMiembro} miembro={miembro} />)
            ) : (
              <p className={estilos.ayuda}>Este equipo todavía no tiene integrantes asignados.</p>
            )}
          </div>
        </section>

        <section className={`tarjeta ${estilos.seccion}`}>
          <h2>Product Backlog</h2>
          <p className={estilos.contadorHistorias}>{totalHistorias}</p>
          <p className={estilos.ayuda}>{totalHistorias === 1 ? 'historia registrada' : 'historias registradas'}</p>
          <Link to={`/proyectos/${id}/backlog`} className="boton boton-primario">
            Abrir backlog
          </Link>
        </section>

        <section className={`tarjeta ${estilos.seccion}`}>
          <h2>Sprints</h2>
          {sprintActivo ? (
            <>
              <p className={estilos.nombreEquipo}>{sprintActivo.Nombre} · {sprintActivo.Estado}</p>
              <p className={estilos.ayuda}>“{sprintActivo.SprintGoal}”</p>
            </>
          ) : (
            <p className={estilos.ayuda}>Todavía no existen Sprints para este proyecto.</p>
          )}
          <Link to={`/proyectos/${id}/sprints`} className="boton boton-primario">
            {sprints.length === 0 ? 'Planificar primer Sprint' : 'Ver Sprints'}
          </Link>
        </section>
      </div>
    </div>
  );
}

// Formulario en linea para crear o editar el Product Goal del proyecto.
function FormularioProductGoal({ proyecto, alGuardar, alCancelar }) {
  const [texto, setTexto] = useState(proyecto.ProductGoal || '');
  const [enviando, setEnviando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  // Envia el nuevo texto del Product Goal.
  async function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviando(true);
    setMensajeError('');
    try {
      await alGuardar(texto.trim());
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={manejarEnvio} className={estilos.formularioGoal}>
      <textarea
        className="campo-textarea"
        placeholder="Ej: Permitir que cualquier equipo Scrum organice su backlog en minutos."
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        rows={3}
        autoFocus
      />
      {mensajeError && <p className="campo-error">{mensajeError}</p>}
      <div className="fila" style={{ gap: 'var(--espacio-2)' }}>
        <button type="submit" className="boton boton-primario boton-pequeno" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Guardar Product Goal'}
        </button>
        <button type="button" className="boton boton-fantasma boton-pequeno" onClick={alCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ProyectoDetallePagina;
