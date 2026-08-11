import { ESTADOS_IMPEDIMENTO } from '../constantes/constantes';
import EtiquetaEstadoImpedimento from './EtiquetaEstadoImpedimento';
import estilos from './TarjetaImpedimento.module.css';

// Calcula un texto relativo simple ("hace 2 horas") a partir de una fecha.
function formatearTiempoTranscurrido(fecha) {
  const minutos = Math.floor((Date.now() - new Date(fecha).getTime()) / 60000);
  if (minutos < 1) return 'hace instantes';
  if (minutos < 60) return `hace ${minutos} min`;
  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
  const dias = Math.floor(horas / 24);
  return `hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
}

// Muestra un impedimento del Sprint y permite actualizar su estado de seguimiento.
function TarjetaImpedimento({ impedimento, alCambiarEstado }) {
  return (
    <div className={`tarjeta ${estilos.tarjeta}`}>
      <p className={estilos.descripcion}>{impedimento.Descripcion}</p>
      <div className={estilos.meta}>
        <span className={estilos.reportadoPor}>Reportado por <strong>{impedimento.NombreUsuario}</strong></span>
        <span className={estilos.tiempo}>{formatearTiempoTranscurrido(impedimento.FechaCreacion)}</span>
      </div>
      <div className={estilos.pie}>
        <EtiquetaEstadoImpedimento estado={impedimento.Estado} />
        <select
          className={`campo-select ${estilos.selector}`}
          value={impedimento.Estado}
          onChange={(evento) => alCambiarEstado(impedimento.IdImpedimento, evento.target.value)}
          aria-label="Cambiar estado del impedimento"
        >
          {ESTADOS_IMPEDIMENTO.map((estado) => (
            <option key={estado} value={estado}>{estado}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TarjetaImpedimento;
