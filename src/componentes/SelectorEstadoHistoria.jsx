import { ESTADOS_HISTORIA } from '../constantes/constantes';
import estilos from './SelectorEstadoHistoria.module.css';

// Permite cambiar el estado de una historia mediante un selector accesible
// (alternativa al arrastrar y soltar en el tablero).
function SelectorEstadoHistoria({ valor, alCambiar, deshabilitado }) {
  return (
    <select
      className={`campo-select ${estilos.selector}`}
      value={valor}
      disabled={deshabilitado}
      onChange={(evento) => alCambiar(evento.target.value)}
      aria-label="Cambiar estado de la historia"
    >
      {ESTADOS_HISTORIA.map((estado) => (
        <option key={estado} value={estado}>{estado}</option>
      ))}
    </select>
  );
}

export default SelectorEstadoHistoria;
