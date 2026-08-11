import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as retrospectivaServicio from '../servicios/retrospectivaServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import ColumnaRetrospectiva from '../componentes/ColumnaRetrospectiva';
import TarjetaAccionMejora from '../componentes/TarjetaAccionMejora';
import estilos from './RetrospectivaPagina.module.css';

// Gestiona la retrospectiva del Sprint con aportes y acciones de mejora.
function RetrospectivaPagina() {
  const { id: idProyecto, idSprint } = useParams();
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');
  const [nuevaAccion, setNuevaAccion] = useState({ descripcion: '', idResponsable: '' });

  useEffect(() => {
    cargarRetrospectiva();
  }, [idSprint]);

  // Obtiene la retrospectiva actual del Sprint.
  async function cargarRetrospectiva() {
    setCargando(true);
    setMensajeError('');
    try {
      setDatos(await retrospectivaServicio.obtenerRetrospectiva(idSprint));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Crea explicitamente la retrospectiva del Sprint.
  async function manejarCrearRetrospectiva() {
    setDatos(await retrospectivaServicio.crearRetrospectiva(idSprint));
  }

  // Agrega un aporte a una de las columnas de retrospectiva.
  async function manejarAgregarElemento(tipo, descripcion) {
    const actualizada = await retrospectivaServicio.crearElementoRetrospectiva(datos.retrospectiva.IdRetrospectiva, { tipo, descripcion });
    setDatos(actualizada);
  }

  // Crea una nueva accion de mejora desde la tercera columna.
  async function manejarCrearAccion(evento) {
    evento.preventDefault();
    if (!nuevaAccion.descripcion.trim()) return;
    const actualizada = await retrospectivaServicio.crearAccionMejora(datos.retrospectiva.IdRetrospectiva, nuevaAccion);
    setDatos(actualizada);
    setNuevaAccion({ descripcion: '', idResponsable: '' });
  }

  // Actualiza responsable o estado de una accion de mejora.
  async function manejarActualizarAccion(idAccion, payload) {
    const actualizada = await retrospectivaServicio.actualizarAccionMejora(idAccion, payload);
    setDatos(actualizada);
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando retrospectiva..." />;
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}/sprints/${idSprint}`} className={estilos.volver}>← Volver al Sprint</Link>

      <section className={estilos.encabezado}>
        <p className={estilos.etiqueta}>Sprint Retrospective</p>
        <h1>Aprendizaje del equipo</h1>
        <p>Inspecciona como trabajo el equipo y convierte los aprendizajes en acciones concretas.</p>
      </section>

      {mensajeError && <p className="campo-error">{mensajeError}</p>}

      {!datos?.retrospectiva ? (
        <EstadoVacio
          icono="🪴"
          titulo="Todavia no existe una retrospectiva para este Sprint"
          descripcion="Crea la retrospectiva para registrar que funciono bien, que mejorar y las acciones resultantes."
          accion={<button type="button" className="boton boton-primario" onClick={manejarCrearRetrospectiva}>Crear retrospectiva</button>}
        />
      ) : (
        <div className={estilos.grilla}>
          <ColumnaRetrospectiva
            titulo="¿Que funciono bien?"
            descripcion="Aspectos positivos observados por el equipo."
            items={datos.positivos}
            tipo="Positivo"
            alAgregar={manejarAgregarElemento}
          />
          <ColumnaRetrospectiva
            titulo="¿Que mejorar?"
            descripcion="Problemas o oportunidades de mejora del proceso."
            items={datos.mejoras}
            tipo="Mejora"
            alAgregar={manejarAgregarElemento}
          />
          <section className={`tarjeta ${estilos.columnaAcciones}`}>
            <div>
              <h2>Acciones</h2>
              <p>Transforma los aprendizajes en compromisos con responsable y estado.</p>
            </div>

            <form className={estilos.formularioAccion} onSubmit={manejarCrearAccion}>
              <textarea
                className="campo-textarea"
                rows={3}
                value={nuevaAccion.descripcion}
                onChange={(evento) => setNuevaAccion((anterior) => ({ ...anterior, descripcion: evento.target.value }))}
                placeholder="Ej: Dividir historias mayores a 8 puntos durante refinamiento."
              />
              <select
                className="campo-select"
                value={nuevaAccion.idResponsable}
                onChange={(evento) => setNuevaAccion((anterior) => ({ ...anterior, idResponsable: evento.target.value }))}
              >
                <option value="">Asignar responsable</option>
                {datos.responsablesDisponibles.map((responsable) => (
                  <option key={responsable.IdUsuario} value={responsable.IdUsuario}>{responsable.Nombre}</option>
                ))}
              </select>
              <button type="submit" className="boton boton-secundario">+ Crear accion</button>
            </form>

            <div className={estilos.listaAcciones}>
              {datos.acciones.length === 0 ? (
                <p className={estilos.vacio}>Todavia no se han creado acciones de mejora.</p>
              ) : (
                datos.acciones.map((accion) => (
                  <TarjetaAccionMejora
                    key={accion.IdAccion}
                    accion={accion}
                    responsables={datos.responsablesDisponibles}
                    alGuardar={manejarActualizarAccion}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default RetrospectivaPagina;