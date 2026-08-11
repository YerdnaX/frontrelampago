import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as definitionDoneServicio from '../servicios/definitionDoneServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import IndicadorCarga from '../componentes/IndicadorCarga';
import EstadoVacio from '../componentes/EstadoVacio';
import ListaDefinitionDone from '../componentes/ListaDefinitionDone';
import estilos from './DefinitionDonePagina.module.css';

// Gestiona la Definition of Done reutilizable a nivel del proyecto.
function DefinitionDonePagina() {
  const { id: idProyecto } = useParams();
  const [criterios, setCriterios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    cargarDefinitionDone();
  }, [idProyecto]);

  // Obtiene los criterios activos del proyecto.
  async function cargarDefinitionDone() {
    setCargando(true);
    setMensajeError('');
    try {
      setCriterios(await definitionDoneServicio.obtenerDefinitionDone(idProyecto));
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setCargando(false);
    }
  }

  // Agrega un criterio nuevo a la Definition of Done.
  async function manejarCrear(descripcion) {
    const creado = await definitionDoneServicio.crearCriterioDefinitionDone(idProyecto, descripcion);
    setCriterios((anterior) => [...anterior, creado]);
  }

  // Actualiza un criterio existente de la Definition of Done.
  async function manejarActualizar(idDefinitionDone, descripcion) {
    const actualizado = await definitionDoneServicio.actualizarCriterioDefinitionDone(idDefinitionDone, descripcion);
    setCriterios((anterior) => anterior.map((criterio) => (criterio.IdDefinitionDone === idDefinitionDone ? actualizado : criterio)));
  }

  // Desactiva un criterio de la Definition of Done.
  async function manejarEliminar(idDefinitionDone) {
    await definitionDoneServicio.eliminarCriterioDefinitionDone(idDefinitionDone);
    setCriterios((anterior) => anterior.filter((criterio) => criterio.IdDefinitionDone !== idDefinitionDone));
  }

  if (cargando) {
    return <IndicadorCarga mensaje="Cargando Definition of Done..." />;
  }

  return (
    <div className="contenedor-pagina">
      <Link to={`/proyectos/${idProyecto}`} className={estilos.volver}>← Volver al proyecto</Link>

      <section className={estilos.hero}>
        <p className={estilos.etiqueta}>Calidad del Sprint</p>
        <h1>Definition of Done</h1>
        <p>Estos son los criterios minimos que una historia debe cumplir antes de considerarse terminada.</p>
      </section>

      {mensajeError && <p className="campo-error">{mensajeError}</p>}

      <section className={`tarjeta ${estilos.tarjeta}`}>
        {criterios.length === 0 ? (
          <EstadoVacio
            icono="✓"
            titulo="Todavia no se ha definido el Definition of Done"
            descripcion="Define los criterios que todo trabajo debe cumplir antes de marcar una historia como terminada."
          />
        ) : null}

        <ListaDefinitionDone
          criterios={criterios}
          alCrear={manejarCrear}
          alActualizar={manejarActualizar}
          alEliminar={manejarEliminar}
        />
      </section>
    </div>
  );
}

export default DefinitionDonePagina;