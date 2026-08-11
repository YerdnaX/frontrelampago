import { useContext } from 'react';
import { AutenticacionContexto } from '../contexto/AutenticacionContexto';

// Expone el contexto de autenticacion a cualquier componente.
export function useAutenticacion() {
  const contexto = useContext(AutenticacionContexto);
  if (!contexto) {
    throw new Error('useAutenticacion debe usarse dentro de AutenticacionProveedor.');
  }
  return contexto;
}
