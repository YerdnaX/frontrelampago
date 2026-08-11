import { useEffect, useState } from 'react';
import { ESTADOS_ACCION_MEJORA } from '../constantes/constantes';
import estilos from './TarjetaAccionMejora.module.css';

// Permite gestionar una accion de mejora con responsable y estado.
function TarjetaAccionMejora({ accion, responsables, alGuardar }) {
  const [descripcion, setDescripcion] = useState(accion.Descripcion);
  const [idResponsable, setIdResponsable] = useState(accion.IdResponsable || '');
  const [estado, setEstado] = useState(accion.Estado);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    setDescripcion(accion.Descripcion);
    setIdResponsable(accion.IdResponsable || '');
    setEstado(accion.Estado);
  }, [accion]);

  // Guarda los cambios de la accion de mejora actual.
  async function manejarGuardar() {
    setGuardando(true);
    try {
      await alGuardar(accion.IdAccion, { descripcion, idResponsable, estado });
    } finally {
      setGuardando(false);
    }
  }

  return (
    <article className={`tarjeta ${estilos.tarjeta}`}>
      <textarea className="campo-textarea" rows={3} value={descripcion} onChange={(evento) => setDescripcion(evento.target.value)} />

      <div className={estilos.controles}>
        <select className="campo-select" value={idResponsable} onChange={(evento) => setIdResponsable(evento.target.value)} aria-label="Responsable de la accion">
          <option value="">Sin responsable</option>
          {responsables.map((responsable) => (
            <option key={responsable.IdUsuario} value={responsable.IdUsuario}>{responsable.Nombre}</option>
          ))}
        </select>

        <select className="campo-select" value={estado} onChange={(evento) => setEstado(evento.target.value)} aria-label="Estado de la accion">
          {ESTADOS_ACCION_MEJORA.map((opcion) => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>
      </div>

      <button type="button" className="boton boton-secundario" onClick={manejarGuardar} disabled={guardando}>
        {guardando ? 'Guardando...' : 'Guardar accion'}
      </button>
    </article>
  );
}

export default TarjetaAccionMejora;