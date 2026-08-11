import { STORY_POINTS } from '../constantes/constantes';
import estilos from './SelectorStoryPoints.module.css';

// Permite elegir un valor de Story Points entre las opciones validas.
function SelectorStoryPoints({ valor, alCambiar }) {
  return (
    <div className={estilos.grupo} role="radiogroup" aria-label="Story Points">
      {STORY_POINTS.map((punto) => (
        <button
          key={punto}
          type="button"
          role="radio"
          aria-checked={valor === punto}
          className={`${estilos.opcion} ${valor === punto ? estilos.seleccionado : ''}`}
          onClick={() => alCambiar(punto)}
        >
          {punto}
        </button>
      ))}
    </div>
  );
}

export default SelectorStoryPoints;
