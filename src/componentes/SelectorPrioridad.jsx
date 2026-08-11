import { PRIORIDADES } from '../constantes/constantes';
import estilos from './SelectorPrioridad.module.css';

const CLASES_POR_PRIORIDAD = { Alta: estilos.alta, Media: estilos.media, Baja: estilos.baja };

// Permite elegir la prioridad de una historia entre Alta, Media y Baja.
function SelectorPrioridad({ valor, alCambiar }) {
  return (
    <div className={estilos.grupo} role="radiogroup" aria-label="Prioridad">
      {PRIORIDADES.map((prioridad) => (
        <button
          key={prioridad}
          type="button"
          role="radio"
          aria-checked={valor === prioridad}
          className={`${estilos.opcion} ${valor === prioridad ? `${estilos.seleccionado} ${CLASES_POR_PRIORIDAD[prioridad]}` : ''}`}
          onClick={() => alCambiar(prioridad)}
        >
          {prioridad}
        </button>
      ))}
    </div>
  );
}

export default SelectorPrioridad;
