import { createContext, useEffect, useMemo, useState } from 'react';
import * as autenticacionServicio from '../servicios/autenticacionServicio';
import { CLAVE_ALMACENAMIENTO_TOKEN, CLAVE_ALMACENAMIENTO_USUARIO } from '../constantes/constantes';

export const AutenticacionContexto = createContext(null);

// Provee el estado de sesion (usuario, token) a toda la aplicacion.
export function AutenticacionProveedor({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO_USUARIO);
    return guardado ? JSON.parse(guardado) : null;
  });
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(CLAVE_ALMACENAMIENTO_TOKEN);
    if (!token) {
      setCargandoSesion(false);
      return;
    }

    autenticacionServicio
      .obtenerUsuarioActual()
      .then((datosUsuario) => {
        setUsuario(datosUsuario);
        localStorage.setItem(CLAVE_ALMACENAMIENTO_USUARIO, JSON.stringify(datosUsuario));
      })
      .catch(() => {
        localStorage.removeItem(CLAVE_ALMACENAMIENTO_TOKEN);
        localStorage.removeItem(CLAVE_ALMACENAMIENTO_USUARIO);
        setUsuario(null);
      })
      .finally(() => setCargandoSesion(false));
  }, []);

  // Guarda el token y el usuario tras un inicio de sesion exitoso.
  function iniciarSesion(token, datosUsuario) {
    localStorage.setItem(CLAVE_ALMACENAMIENTO_TOKEN, token);
    localStorage.setItem(CLAVE_ALMACENAMIENTO_USUARIO, JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  }

  // Elimina la sesion actual del usuario.
  function cerrarSesion() {
    localStorage.removeItem(CLAVE_ALMACENAMIENTO_TOKEN);
    localStorage.removeItem(CLAVE_ALMACENAMIENTO_USUARIO);
    setUsuario(null);
    autenticacionServicio.cerrarSesionRemota().catch(() => {});
  }

  const valor = useMemo(
    () => ({ usuario, cargandoSesion, iniciarSesion, cerrarSesion, estaAutenticado: Boolean(usuario) }),
    [usuario, cargandoSesion]
  );

  return <AutenticacionContexto.Provider value={valor}>{children}</AutenticacionContexto.Provider>;
}
