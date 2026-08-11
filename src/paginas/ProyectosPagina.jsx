import { useEffect, useState } from 'react';
import * as proyectosServicio from '../servicios/proyectosServicio';
import * as equiposServicio from '../servicios/equiposServicio';
import * as usuariosServicio from '../servicios/usuariosServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import TarjetaProyecto from '../componentes/TarjetaProyecto';
import estilos from './ProyectosPagina.module.css';

// Pantalla que lista los proyectos y permite crear uno nuevo.
function ProyectosPagina() {
  const [proyectos, setProyectos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  // Carga proyectos, equipos y usuarios en paralelo.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const [listaProyectos, listaEquipos, listaUsuarios] = await Promise.all([
        proyectosServicio.obtenerProyectos(),
        equiposServicio.obtenerEquipos(),
        usuariosServicio.obtenerUsuarios(),
      ]);
      setProyectos(listaProyectos);
      setEquipos(listaEquipos);
      setUsuarios(listaUsuarios);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando proyectos..." />;
  }

  return (
    <div className="contenedor-pagina">
      <div className="fila separado envolver" style={{ marginBottom: 'var(--espacio-5)', gap: 'var(--espacio-3)' }}>
        <div>
          <h1>Proyectos</h1>
          <p style={{ color: 'var(--color-texto-suave)', marginTop: 4 }}>Productos activos gestionados por tus equipos Scrum.</p>
        </div>
        <button type="button" className="boton boton-primario" onClick={() => setFormularioAbierto(true)}>
          + Nuevo proyecto
        </button>
      </div>

      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      {formularioAbierto && (
        <FormularioNuevoProyecto
          equipos={equipos}
          usuarios={usuarios}
          alCancelar={() => setFormularioAbierto(false)}
          alCrear={async (datos) => {
            const nuevo = await proyectosServicio.crearProyecto(datos);
            setProyectos((anterior) => [{ ...nuevo, TotalHistorias: 0, NombreEquipo: '', NombreProductOwner: '' }, ...anterior]);
            setFormularioAbierto(false);
            cargarDatos();
          }}
        />
      )}

      {proyectos.length === 0 ? (
        <EstadoVacio
          icono="🚀"
          titulo="Todavía no existen proyectos"
          descripcion="Crea el primer producto para comenzar a definir su Product Goal y su backlog."
          accion={
            <button type="button" className="boton boton-primario" onClick={() => setFormularioAbierto(true)}>
              + Crear proyecto
            </button>
          }
        />
      ) : (
        <div className={estilos.grilla}>
          {proyectos.map((proyecto) => (
            <TarjetaProyecto key={proyecto.IdProyecto} proyecto={proyecto} />
          ))}
        </div>
      )}
    </div>
  );
}

// Formulario para crear un nuevo producto/proyecto.
function FormularioNuevoProyecto({ equipos, usuarios, alCancelar, alCrear }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idEquipo, setIdEquipo] = useState('');
  const [idProductOwner, setIdProductOwner] = useState('');
  const [productGoal, setProductGoal] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  // Valida y envia los datos del nuevo proyecto.
  async function manejarEnvio(evento) {
    evento.preventDefault();
    if (!nombre.trim() || !idEquipo || !idProductOwner) {
      setMensajeError('Nombre, equipo y Product Owner son obligatorios.');
      return;
    }
    setEnviando(true);
    setMensajeError('');
    try {
      await alCrear({ nombre, descripcion, idEquipo, idProductOwner, productGoal });
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className={`tarjeta ${estilos.formulario}`} onSubmit={manejarEnvio}>
      <h3>Nuevo proyecto</h3>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="nombre-proyecto">Nombre</label>
        <input id="nombre-proyecto" className="campo-entrada" value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
      </div>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="descripcion-proyecto">Descripción</label>
        <textarea id="descripcion-proyecto" className="campo-textarea" value={descripcion} onChange={(evento) => setDescripcion(evento.target.value)} />
      </div>
      <div className={estilos.filaCampos}>
        <div className="campo">
          <label className="campo-etiqueta" htmlFor="equipo-proyecto">Equipo Scrum</label>
          <select id="equipo-proyecto" className="campo-select" value={idEquipo} onChange={(evento) => setIdEquipo(evento.target.value)}>
            <option value="">Selecciona un equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.IdEquipo} value={equipo.IdEquipo}>{equipo.Nombre}</option>
            ))}
          </select>
        </div>
        <div className="campo">
          <label className="campo-etiqueta" htmlFor="po-proyecto">Product Owner</label>
          <select id="po-proyecto" className="campo-select" value={idProductOwner} onChange={(evento) => setIdProductOwner(evento.target.value)}>
            <option value="">Selecciona un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.IdUsuario} value={usuario.IdUsuario}>{usuario.Nombre}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="goal-proyecto">Product Goal (opcional)</label>
        <textarea id="goal-proyecto" className="campo-textarea" value={productGoal} onChange={(evento) => setProductGoal(evento.target.value)} />
      </div>

      {mensajeError && <p className="campo-error">{mensajeError}</p>}

      <div className="fila" style={{ gap: 'var(--espacio-2)' }}>
        <button type="submit" className="boton boton-primario" disabled={enviando}>
          {enviando ? 'Creando...' : 'Crear proyecto'}
        </button>
        <button type="button" className="boton boton-fantasma" onClick={alCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ProyectosPagina;
