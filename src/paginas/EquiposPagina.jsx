import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as equiposServicio from '../servicios/equiposServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import estilos from './EquiposPagina.module.css';

// Pantalla que lista los equipos Scrum y permite crear uno nuevo.
function EquiposPagina() {
  const [equipos, setEquipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  useEffect(() => {
    cargarEquipos();
  }, []);

  // Solicita al backend la lista actualizada de equipos.
  async function cargarEquipos() {
    setCargando(true);
    try {
      setEquipos(await equiposServicio.obtenerEquipos());
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando equipos..." />;
  }

  return (
    <div className="contenedor-pagina">
      <div className="fila separado envolver" style={{ marginBottom: 'var(--espacio-5)', gap: 'var(--espacio-3)' }}>
        <div>
          <h1>Equipos Scrum</h1>
          <p style={{ color: 'var(--color-texto-suave)', marginTop: 4 }}>Organiza a las personas que participan en tus productos.</p>
        </div>
        <button type="button" className="boton boton-primario" onClick={() => setFormularioAbierto(true)}>
          + Nuevo equipo
        </button>
      </div>

      {mensajeError && <p className="campo-error" style={{ marginBottom: 'var(--espacio-4)' }}>{mensajeError}</p>}

      {formularioAbierto && (
        <FormularioNuevoEquipo
          alCancelar={() => setFormularioAbierto(false)}
          alCrear={async (datos) => {
            await equiposServicio.crearEquipo(datos);
            setFormularioAbierto(false);
            cargarEquipos();
          }}
        />
      )}

      {equipos.length === 0 ? (
        <EstadoVacio
          icono="👥"
          titulo="Todavía no existen equipos"
          descripcion="Crea tu primer equipo Scrum para poder asignar Product Owner, Scrum Master y Developers."
          accion={
            <button type="button" className="boton boton-primario" onClick={() => setFormularioAbierto(true)}>
              + Crear equipo
            </button>
          }
        />
      ) : (
        <div className={estilos.grilla}>
          {equipos.map((equipo) => (
            <Link key={equipo.IdEquipo} to={`/equipos/${equipo.IdEquipo}`} className={`tarjeta ${estilos.tarjeta}`}>
              <h3>{equipo.Nombre}</h3>
              {equipo.Descripcion && <p>{equipo.Descripcion}</p>}
              <span className="insignia" style={{ background: 'var(--color-primario-suave)', color: 'var(--color-primario-fuerte)' }}>
                {equipo.TotalMiembros} integrantes
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Formulario para crear un nuevo equipo Scrum.
function FormularioNuevoEquipo({ alCancelar, alCrear }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  // Valida y envia los datos del nuevo equipo.
  async function manejarEnvio(evento) {
    evento.preventDefault();
    if (!nombre.trim()) {
      setMensajeError('El nombre del equipo es obligatorio.');
      return;
    }
    setEnviando(true);
    setMensajeError('');
    try {
      await alCrear({ nombre, descripcion });
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className={`tarjeta ${estilos.formulario}`} onSubmit={manejarEnvio}>
      <h3>Nuevo equipo</h3>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="nombre-equipo">Nombre</label>
        <input id="nombre-equipo" className="campo-entrada" value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
      </div>
      <div className="campo">
        <label className="campo-etiqueta" htmlFor="descripcion-equipo">Descripción (opcional)</label>
        <textarea id="descripcion-equipo" className="campo-textarea" value={descripcion} onChange={(evento) => setDescripcion(evento.target.value)} />
      </div>
      {mensajeError && <p className="campo-error">{mensajeError}</p>}
      <div className="fila" style={{ gap: 'var(--espacio-2)' }}>
        <button type="submit" className="boton boton-primario" disabled={enviando}>
          {enviando ? 'Creando...' : 'Crear equipo'}
        </button>
        <button type="button" className="boton boton-fantasma" onClick={alCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default EquiposPagina;
