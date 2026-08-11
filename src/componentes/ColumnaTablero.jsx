import { useState } from 'react';
import estilos from './ColumnaTablero.module.css';

// Columna del tablero Kanban que representa un estado y acepta soltar tarjetas.
function ColumnaTablero({ estado, historias, children, alSoltar }) {
  const [sobreZona, setSobreZona] = useState(false);

  return (
    <div
      className={`${estilos.columna} ${sobreZona ? estilos.sobreZona : ''}`}
      onDragOver={(evento) => {
        evento.preventDefault();
        setSobreZona(true);
      }}
      onDragLeave={() => setSobreZona(false)}
      onDrop={(evento) => {
        evento.preventDefault();
        setSobreZona(false);
        const idHistoria = Number(evento.dataTransfer.getData('text/plain'));
        alSoltar(idHistoria, estado);
      }}
    >
      <div className={estilos.encabezado}>
        <h3>{estado}</h3>
        <span className={estilos.contador}>{historias.length}</span>
      </div>
      <div className={estilos.lista}>
        {historias.length === 0 ? <p className={estilos.vacio}>Sin historias</p> : children}
      </div>
    </div>
  );
}

export default ColumnaTablero;
