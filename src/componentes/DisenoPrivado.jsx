import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BarraLateral from './BarraLateral';
import Encabezado from './Encabezado';
import estilos from './DisenoPrivado.module.css';

// Define el layout comun (sidebar + encabezado) de las pantallas privadas.
function DisenoPrivado() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className={estilos.contenedor}>
      <BarraLateral abierta={menuAbierto} alCerrar={() => setMenuAbierto(false)} />
      <div className={estilos.principal}>
        <Encabezado alAbrirMenu={() => setMenuAbierto(true)} />
        <main className={estilos.contenido}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DisenoPrivado;
