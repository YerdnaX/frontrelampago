import { Link } from 'react-router-dom';
import EtiquetaPrioridad from './EtiquetaPrioridad';
import SelectorEstadoHistoria from './SelectorEstadoHistoria';
import estilos from './TarjetaTablero.module.css';

// Tarjeta del tablero Kanban: representa una historia comprometida en el Sprint.
// Soporta arrastrar y soltar, y ademas expone un selector accesible para
// cambiar de estado sin necesidad de arrastrar (teclado / lectores de pantalla).
function TarjetaTablero({ idProyecto, historia, alCambiarEstado, arrastrando, alIniciarArrastre, alTerminarArrastre }) {
  return (
    <div
      className={`${estilos.tarjeta} ${arrastrando ? estilos.arrastrando : ''}`}
      draggable
      onDragStart={(evento) => {
        evento.dataTransfer.setData('text/plain', String(historia.IdHistoria));
        alIniciarArrastre(historia.IdHistoria);
      }}
      onDragEnd={alTerminarArrastre}
    >
      <div className={estilos.encabezado}>
        <Link to={`/proyectos/${idProyecto}/backlog/historias/${historia.IdHistoria}`} className={estilos.codigo}>
          HU-{historia.IdHistoria}
        </Link>
        <span className="insignia" style={{ background: 'var(--color-superficie-alterna)', color: 'var(--color-texto-suave)' }}>
          {historia.StoryPoints ?? '—'} pts
        </span>
      </div>

      <Link to={`/proyectos/${idProyecto}/backlog/historias/${historia.IdHistoria}`} className={estilos.titulo}>
        {historia.Titulo}
      </Link>

      <div className={estilos.pie}>
        <EtiquetaPrioridad prioridad={historia.Prioridad} />
      </div>

      <SelectorEstadoHistoria valor={historia.Estado} alCambiar={(estado) => alCambiarEstado(historia, estado)} />
    </div>
  );
}

export default TarjetaTablero;
