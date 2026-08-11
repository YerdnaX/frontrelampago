import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as equiposServicio from '../servicios/equiposServicio';
import * as usuariosServicio from '../servicios/usuariosServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import { ROLES_SCRUM } from '../constantes/constantes';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import TarjetaMiembroEquipo from '../componentes/TarjetaMiembroEquipo';
import estilos from './EquipoDetallePagina.module.css';

// Pantalla de detalle de un equipo Scrum: miembros y asignacion de roles.
function EquipoDetallePagina() {
  const { id } = useParams();
  const [equipo, setEquipo] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState(ROLES_SCRUM[2]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [id]);

  // Carga el equipo y los usuarios disponibles para asignar.
  async function cargarDatos() {
    setCargando(true);
    setMensajeError('');
    try {
      const [datosEquipo, listaUsuarios] = await Promise.all([
        equiposServicio.obtenerEquipoPorId(id),
        usuariosServicio.obtenerUsuarios(),
      ]);
      setEquipo(datosEquipo);
      setUsuarios(listaUsuarios);
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Agrega el usuario seleccionado al equipo con el rol elegido.
  async function manejarAgregarMiembro(evento) {
    evento.preventDefault();
    if (!idUsuarioSeleccionado) {
      setMensajeError('Selecciona un usuario para agregarlo al equipo.');
      return;
    }
    setEnviando(true);
    setMensajeError('');
    try {
      const equipoActualizado = await equiposServicio.agregarMiembroEquipo(id, idUsuarioSeleccionado, rolSeleccionado);
      setEquipo(equipoActualizado);
      setIdUsuarioSeleccionado('');
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviando(false);
    }
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando equipo..." />;
  }

  if (!equipo) {
    return (
      <div className="contenedor-pagina">
        <p className="campo-error">{mensajeError || 'El equipo no existe.'}</p>
      </div>
    );
  }

  const usuariosDisponibles = usuarios.filter((usuario) => !equipo.miembros.some((miembro) => miembro.IdUsuario === usuario.IdUsuario));

  return (
    <div className="contenedor-pagina">
      <Link to="/equipos" className={estilos.volver}>← Volver a equipos</Link>
      <h1>{equipo.Nombre}</h1>
      {equipo.Descripcion && <p className={estilos.descripcion}>{equipo.Descripcion}</p>}

      <div className={estilos.disposicion}>
        <section className={`tarjeta ${estilos.seccion}`}>
          <h2>Integrantes</h2>
          {equipo.miembros.length === 0 ? (
            <EstadoVacio icono="🧑‍🤝‍🧑" titulo="Aún no hay integrantes" descripcion="Agrega usuarios y asígnales un rol Scrum." />
          ) : (
            <div className={estilos.listaMiembros}>
              {equipo.miembros.map((miembro) => (
                <TarjetaMiembroEquipo key={miembro.IdEquipoMiembro} miembro={miembro} />
              ))}
            </div>
          )}
        </section>

        <section className={`tarjeta ${estilos.seccion}`}>
          <h2>Asignar responsabilidad</h2>
          <p className={estilos.ayuda}>Selecciona un usuario y el rol Scrum que ocupará dentro de este equipo.</p>

          <form onSubmit={manejarAgregarMiembro} className={estilos.formulario}>
            <div className="campo">
              <label className="campo-etiqueta" htmlFor="usuario-equipo">Usuario</label>
              <select
                id="usuario-equipo"
                className="campo-select"
                value={idUsuarioSeleccionado}
                onChange={(evento) => setIdUsuarioSeleccionado(evento.target.value)}
              >
                <option value="">Selecciona un usuario</option>
                {usuariosDisponibles.map((usuario) => (
                  <option key={usuario.IdUsuario} value={usuario.IdUsuario}>{usuario.Nombre} · {usuario.Correo}</option>
                ))}
              </select>
            </div>

            <div className="campo">
              <span className="campo-etiqueta">Rol Scrum</span>
              <div className={estilos.roles}>
                {ROLES_SCRUM.map((rol) => (
                  <button
                    key={rol}
                    type="button"
                    className={`${estilos.rolOpcion} ${rolSeleccionado === rol ? estilos.rolActivo : ''}`}
                    onClick={() => setRolSeleccionado(rol)}
                  >
                    {rol}
                  </button>
                ))}
              </div>
            </div>

            {mensajeError && <p className="campo-error">{mensajeError}</p>}

            <button type="submit" className="boton boton-primario" disabled={enviando || usuariosDisponibles.length === 0}>
              {enviando ? 'Agregando...' : '+ Agregar al equipo'}
            </button>
            {usuariosDisponibles.length === 0 && <p className={estilos.ayuda}>Todos los usuarios ya pertenecen a este equipo.</p>}
          </form>
        </section>
      </div>
    </div>
  );
}

export default EquipoDetallePagina;
