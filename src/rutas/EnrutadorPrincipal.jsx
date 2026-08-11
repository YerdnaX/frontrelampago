import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AutenticacionProveedor } from '../contexto/AutenticacionContexto';
import RutaPrivada from './RutaPrivada';
import InicioSesionPagina from '../paginas/InicioSesionPagina';
import ProyectosPagina from '../paginas/ProyectosPagina';
import ProyectoDetallePagina from '../paginas/ProyectoDetallePagina';
import BacklogPagina from '../paginas/BacklogPagina';
import HistoriaDetallePagina from '../paginas/HistoriaDetallePagina';
import EquiposPagina from '../paginas/EquiposPagina';
import EquipoDetallePagina from '../paginas/EquipoDetallePagina';

// Define el mapa de rutas publicas y privadas de la aplicacion.
function EnrutadorPrincipal() {
  return (
    <BrowserRouter>
      <AutenticacionProveedor>
        <Routes>
          <Route path="/iniciar-sesion" element={<InicioSesionPagina />} />

          <Route element={<RutaPrivada />}>
            <Route path="/" element={<Navigate to="/proyectos" replace />} />
            <Route path="/proyectos" element={<ProyectosPagina />} />
            <Route path="/proyectos/:id" element={<ProyectoDetallePagina />} />
            <Route path="/proyectos/:id/backlog" element={<BacklogPagina />} />
            <Route path="/proyectos/:id/backlog/historias/:idHistoria" element={<HistoriaDetallePagina />} />
            <Route path="/equipos" element={<EquiposPagina />} />
            <Route path="/equipos/:id" element={<EquipoDetallePagina />} />
          </Route>

          <Route path="*" element={<Navigate to="/proyectos" replace />} />
        </Routes>
      </AutenticacionProveedor>
    </BrowserRouter>
  );
}

export default EnrutadorPrincipal;
