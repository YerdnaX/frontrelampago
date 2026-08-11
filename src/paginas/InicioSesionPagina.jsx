import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../hooks/useAutenticacion';
import * as autenticacionServicio from '../servicios/autenticacionServicio';
import { extraerMensajeError } from '../servicios/clienteApi';
import estilos from './InicioSesionPagina.module.css';

// Pantalla de inicio de sesion con validaciones y manejo de estados de carga/error.
function InicioSesionPagina() {
  const { estaAutenticado, iniciarSesion } = useAutenticacion();
  const navegar = useNavigate();
  const ubicacion = useLocation();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errores, setErrores] = useState({});
  const [mensajeError, setMensajeError] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (estaAutenticado) {
    const destino = ubicacion.state?.desde || '/proyectos';
    return <Navigate to={destino} replace />;
  }

  // Valida los campos del formulario antes de enviarlo.
  function validar() {
    const erroresEncontrados = {};
    if (!correo.trim()) erroresEncontrados.correo = 'El correo es obligatorio.';
    if (!contrasena) erroresEncontrados.contrasena = 'La contraseña es obligatoria.';
    setErrores(erroresEncontrados);
    return Object.keys(erroresEncontrados).length === 0;
  }

  // Envia las credenciales al backend e inicia la sesion si son correctas.
  async function manejarEnvio(evento) {
    evento.preventDefault();
    setMensajeError('');
    if (!validar()) return;

    setEnviando(true);
    try {
      const resultado = await autenticacionServicio.iniciarSesion(correo.trim(), contrasena);
      iniciarSesion(resultado.token, resultado.usuario);
      navegar(ubicacion.state?.desde || '/proyectos', { replace: true });
    } catch (error) {
      setMensajeError(extraerMensajeError(error));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className={estilos.pantalla}>
      <div className={estilos.panelVisual}>
        <span className={estilos.rayo} aria-hidden="true">⚡</span>
        <h1>Relámpago Scrum</h1>
        <p>Organiza tu equipo, define tu producto y prioriza el trabajo que realmente importa.</p>
      </div>

      <div className={estilos.panelFormulario}>
        <div className={estilos.tarjetaFormulario}>
          <h2>Iniciar sesión</h2>
          <p className={estilos.subtitulo}>Accede para continuar con tus proyectos.</p>

          <form onSubmit={manejarEnvio} noValidate className={estilos.formulario}>
            <div className="campo">
              <label className="campo-etiqueta" htmlFor="correo">Correo</label>
              <input
                id="correo"
                type="email"
                className="campo-entrada"
                placeholder="nombre@correo.com"
                value={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
                autoComplete="username"
              />
              {errores.correo && <span className="campo-error">{errores.correo}</span>}
            </div>

            <div className="campo">
              <label className="campo-etiqueta" htmlFor="contrasena">Contraseña</label>
              <input
                id="contrasena"
                type="password"
                className="campo-entrada"
                placeholder="••••••••"
                value={contrasena}
                onChange={(evento) => setContrasena(evento.target.value)}
                autoComplete="current-password"
              />
              {errores.contrasena && <span className="campo-error">{errores.contrasena}</span>}
            </div>

            {mensajeError && <p className={estilos.mensajeError} role="alert">{mensajeError}</p>}

            <button type="submit" className="boton boton-primario" disabled={enviando}>
              {enviando ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className={estilos.credencialesDemo}>
            <p>Usuario de demostración</p>
            <code>ana.rodriguez@relampago.com</code>
            <code>Scrum123!</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InicioSesionPagina;
