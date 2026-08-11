import { Navigate } from 'react-router-dom';
import { useAutenticacion } from '../hooks/useAutenticacion';
import IndicadorCarga from '../componentes/IndicadorCarga';
import DisenoPrivado from '../componentes/DisenoPrivado';

// Protege las rutas privadas verificando que exista una sesion activa.
function RutaPrivada() {
  const { estaAutenticado, cargandoSesion } = useAutenticacion();

  if (cargandoSesion) {
    return <IndicadorCarga mensaje="Verificando sesión..." />;
  }

  if (!estaAutenticado) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  return <DisenoPrivado />;
}

export default RutaPrivada;
