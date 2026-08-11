# AGENTE DE DESARROLLO — PROYECTO RELÁMPAGO SCRUM

## 1. Propósito

Este archivo define las reglas obligatorias para desarrollar el proyecto **Aplicación web para gestión de proyectos bajo Scrum**.

Claude debe utilizar este documento como guía principal para:
- analizar el proyecto;
- proponer cambios;
- generar código;
- crear pantallas;
- crear endpoints;
- crear modelos y tablas;
- corregir errores;
- mantener coherencia entre frontend, backend y base de datos.

El objetivo es construir un **MVP funcional, demostrable y coherente con Scrum**, priorizando el flujo crítico completo por encima de funcionalidades secundarias.

**Regla tecnológica principal:** este proyecto es exclusivamente una **aplicación web desarrollada con React**.

---

# 2. Stack tecnológico obligatorio

## Frontend

- Framework obligatorio: **React**.
- Tipo de producto: **aplicación web**.
- Lenguaje: **JavaScript o TypeScript según la estructura existente del proyecto**.
- La interfaz debe ser responsive y funcionar correctamente en escritorio, laptop, tablet y resoluciones pequeñas.
- No utilizar Angular, Vue, Flutter, Ionic ni otros frameworks de interfaz.
- Mantener toda la solución frontend dentro de React.
- Utilizar componentes reutilizables únicamente cuando aporten valor real.
- Priorizar una experiencia tipo producto SaaS moderno, clara y profesional.

## Backend

- API REST desarrollada en **Node.js**.
- El backend será desplegado en **Render**.
- Mantener endpoints simples, claros y predecibles.
- Separar rutas, controladores, servicios y acceso a datos cuando sea necesario.
- Evitar arquitecturas innecesariamente complejas para un proyecto de 24 horas.

## Base de datos

- Motor: **SQL Server**.
- Usar tablas sencillas.
- Usar nombres de tablas y columnas en español.
- No utilizar:
  - triggers;
  - procedimientos almacenados;
  - funciones SQL personalizadas;
  - arquitecturas complejas;
  - tablas innecesarias.
- Preferir relaciones simples mediante claves primarias y claves foráneas.

---

# 3. Regla principal de desarrollo

La prioridad absoluta es que el sistema permita demostrar un flujo Scrum completo:

```text
Usuario
  ↓
Equipo Scrum
  ↓
Producto
  ↓
Product Goal
  ↓
Product Backlog
  ↓
Historias de usuario
  ↓
Criterios de aceptación
  ↓
Prioridad
  ↓
Story Points
  ↓
Sprint
  ↓
Sprint Goal
  ↓
Sprint Backlog
  ↓
Tablero
  ↓
Daily Scrum
  ↓
Impedimentos
  ↓
Definition of Done
  ↓
Incremento
  ↓
Sprint Review
  ↓
Retrospective
  ↓
Indicador del Sprint
```

No invertir tiempo primero en módulos secundarios.

---

# 4. Historias de usuario prioritarias

## Fase 1 — Preparación y planificación del producto

Responsable principal: **Integrante 1**

Implementar:

- HU-002 — Inicio de sesión.
- HU-007 — Crear equipo Scrum.
- HU-009 — Asignar responsabilidades.
- HU-013 — Crear producto.
- HU-015 — Definir Product Goal.
- HU-029 — Crear historia de usuario.
- HU-020 — Editar elemento del backlog.
- HU-022 — Ordenar backlog.
- HU-030 — Criterios de aceptación.
- HU-031 — Prioridad.
- HU-043 — Story Points.

Resultado esperado:

```text
Equipo Scrum
→ Producto
→ Product Goal
→ Product Backlog
→ Historias priorizadas
→ Criterios de aceptación
→ Story Points
```

---

## Fase 2 — Sprint y ejecución

Responsable principal: **Integrante 2**

Implementar:

- HU-049 — Crear Sprint.
- HU-052 — Sprint Goal.
- HU-056 — Visualizar backlog priorizado.
- HU-058 — Seleccionar historias.
- HU-059 — Visualizar Story Points comprometidos.
- HU-061 — Crear Sprint Backlog.
- HU-068 — Tablero visual.
- HU-069 — Mover tarjetas.
- HU-074 — Registrar Daily Scrum.
- HU-077 — Crear impedimento desde Daily.
- HU-081 — Estado del impedimento.

Resultado esperado:

```text
Product Backlog
→ Sprint
→ Sprint Goal
→ Sprint Backlog
→ Tablero
→ Daily Scrum
→ Impedimentos
```

---

## Fase 3 — Calidad y cierre

Responsable principal: **Integrante 3**

Implementar:

- HU-084 — Crear Definition of Done.
- HU-085 — Checklist DoD.
- HU-086 — Impedir cierre incompleto.
- HU-093 — Registrar incremento.
- HU-054 — Cerrar Sprint.
- HU-099 — Validar historias.
- HU-100 — Registrar feedback.
- HU-103 — Crear Retrospective.
- HU-104 — Registrar aspectos positivos.
- HU-105 — Registrar problemas.
- HU-106 — Proponer acciones.
- HU-109 — Asignar responsables.
- HU-116 — Cumplimiento del Sprint.

Resultado esperado:

```text
DoD
→ Historia terminada
→ Incremento
→ Sprint Review
→ Feedback
→ Retrospective
→ Acciones de mejora
→ Cierre
→ Indicador
```

---

# 5. Funcionalidades NO prioritarias

No desarrollar primero:

- Planning Poker completo.
- Votación privada.
- Releases avanzados.
- Roadmap.
- Calendario completo.
- Reacciones.
- Menciones.
- Notificaciones avanzadas.
- Dashboards especializados por rol.
- Auditoría avanzada.
- Organizaciones múltiples.
- Backups desde la aplicación.
- Dependencias complejas entre historias.
- Métricas avanzadas.
- Historial detallado de actividad.

Estas funcionalidades solo se consideran después de que el flujo principal funcione correctamente.

---

# 6. Reglas de nombres

## Regla obligatoria

Todos los nombres creados por Claude deben estar en **español**.

Esto incluye:

- variables;
- funciones;
- métodos;
- clases propias;
- interfaces;
- tipos propios;
- componentes;
- hooks propios;
- servicios;
- controladores;
- rutas internas;
- modelos;
- archivos de dominio;
- tablas;
- columnas;
- constantes propias.

No traducir nombres obligatorios de librerías o APIs externas.

### Correcto

```ts
const historiasSeleccionadas = [];
const sprintActual = null;

function calcularAvanceSprint() {}
function crearHistoria() {}
function obtenerProductBacklog() {}
function validarDefinitionOfDone() {}
```

### Incorrecto

```ts
const selectedStories = [];
const currentSprint = null;

function calculateSprintProgress() {}
function createStory() {}
function getBacklog() {}
```

---

# 7. Regla obligatoria de comentarios

Toda función creada debe incluir un comentario básico que explique qué hace.

El comentario debe ser:
- corto;
- directo;
- de máximo medio renglón;
- sin explicaciones extensas;
- sin documentación redundante.

### Correcto

```ts
// Crea una nueva historia de usuario.
function crearHistoria() {
}
```

```ts
// Calcula el porcentaje completado del Sprint.
function calcularAvanceSprint() {
}
```

### Incorrecto

```ts
/*
 * Esta función se encarga de realizar toda la lógica necesaria
 * para calcular el porcentaje total de avance del Sprint...
 */
```

No generar comentarios obvios dentro de cada línea.

---

# 8. Diseño UX/UI

El diseño debe sentirse **actual, profesional, novedoso y completamente orientado a una aplicación web moderna**.

No crear una interfaz que parezca:
- formulario universitario;
- sistema administrativo antiguo;
- ERP tradicional;
- tabla web adaptada a celular;
- clon visual de Jira.

La aplicación debe tener identidad propia.

## Dirección visual

Buscar una apariencia tipo:

- producto SaaS web moderno;
- tarjetas limpias;
- jerarquía visual clara;
- navegación simple;
- información progresiva;
- colores utilizados con intención;
- estados visuales claros;
- microinteracciones;
- buena separación entre contenido;
- elementos interactivos cómodos para mouse y teclado;
- tipografía moderna;
- bordes y superficies suaves;
- buen uso del espacio.

## Home / Dashboard

La pantalla inicial debe priorizar:

1. Sprint actual.
2. Sprint Goal.
3. Progreso.
4. Días restantes.
5. Historias pendientes.
6. Bloqueos o impedimentos.
7. Acceso rápido al tablero.

No llenar la pantalla de métricas innecesarias.

---

# 9. Navegación sugerida

Mantener navegación corta.

```text
Inicio
├── Proyecto
├── Backlog
├── Sprint
├── Tablero
└── Más
    ├── Daily
    ├── Impedimentos
    ├── Review
    └── Retrospective
```

Puede adaptarse si la estructura existente requiere otra solución, pero debe mantenerse simple.

---

# 10. Diseño del Product Backlog

Cada historia debe mostrar como mínimo:

- título;
- prioridad;
- Story Points;
- estado;
- Sprint asociado si existe.

Al abrir una historia mostrar:

- descripción;
- criterios de aceptación;
- prioridad;
- Story Points;
- estado.

Evitar mostrar toda la información en una sola tarjeta.

---

# 11. Diseño del tablero Scrum

El tablero es una de las funcionalidades principales.

Estados recomendados:

```text
Pendiente
→ En progreso
→ En revisión
→ Pruebas
→ Terminado
```

En web puede utilizar:

- columnas visibles tipo Kanban;
- desplazamiento horizontal únicamente si es necesario;
- filtros por estado, responsable o prioridad;
- diseño responsive para pantallas pequeñas.

Las tarjetas deben permitir cambiar de estado de manera simple.

El tablero debe aprovechar correctamente el espacio disponible en escritorio sin perder responsividad.

---

# 12. Daily Scrum

La pantalla de Daily debe permitir registrar:

- ¿Qué avancé?
- ¿Qué haré ahora?
- ¿Existe algún impedimento?

Si existe impedimento, ofrecer una acción inmediata:

```text
Crear impedimento
```

Evitar formularios largos.

---

# 13. Definition of Done

Debe existir una lista verificable.

Ejemplo:

```text
[ ] Código desarrollado
[ ] Pruebas realizadas
[ ] Revisión completada
[ ] Criterios de aceptación cumplidos
```

Una historia no debe pasar a **Terminado** si no cumple la Definition of Done.

---

# 14. Sprint Review

Debe permitir:

- visualizar historias completadas;
- aceptar o validar historias;
- registrar feedback;
- dejar evidencia del resultado del Sprint.

---

# 15. Sprint Retrospective

Mantenerla sencilla.

Tres bloques principales:

```text
¿Qué funcionó bien?

¿Qué debemos mejorar?

¿Qué acción tomaremos?
```

Cada acción de mejora puede tener:

- descripción;
- responsable;
- estado.

---

# 16. Indicador mínimo obligatorio

Implementar inicialmente:

## Cumplimiento del Sprint

```text
porcentaje =
historiasTerminadas / historiasComprometidas * 100
```

Mostrarlo en un componente visual claro.

Ejemplo:

```text
Sprint 3

██████████████░░░░  72%

8 de 11 historias completadas
```

El indicador debe utilizar datos reales de la aplicación.

---

# 17. Arquitectura sugerida del frontend

Mantener una estructura sencilla.

```text
src/
├── componentes/
├── pantallas/
├── navegacion/
├── servicios/
├── hooks/
├── modelos/
├── utilidades/
├── contexto/
└── constantes/
```

Ejemplo:

```text
pantallas/
├── InicioSesionPantalla.tsx
├── InicioPantalla.tsx
├── BacklogPantalla.tsx
├── SprintPantalla.tsx
├── TableroPantalla.tsx
├── DailyPantalla.tsx
├── ImpedimentosPantalla.tsx
├── ReviewPantalla.tsx
└── RetrospectivaPantalla.tsx
```

No crear capas sin utilidad real.

---

# 18. Arquitectura sugerida del backend

```text
src/
├── rutas/
├── controladores/
├── servicios/
├── modelos/
├── baseDatos/
├── middleware/
└── utilidades/
```

Ejemplo:

```text
rutas/
├── usuariosRutas.js
├── proyectosRutas.js
├── historiasRutas.js
├── sprintRutas.js
├── dailyRutas.js
└── retrospectivaRutas.js
```

---

# 19. API REST

Usar endpoints simples y consistentes.

Ejemplos:

```text
POST   /api/usuarios/iniciar-sesion

GET    /api/proyectos
POST   /api/proyectos
GET    /api/proyectos/:id

GET    /api/proyectos/:id/historias
POST   /api/proyectos/:id/historias
PUT    /api/historias/:id

POST   /api/proyectos/:id/sprints
GET    /api/sprints/:id

POST   /api/sprints/:id/historias
PUT    /api/historias/:id/estado

POST   /api/sprints/:id/daily
POST   /api/sprints/:id/impedimentos

GET    /api/proyectos/:id/definition-done
PUT    /api/historias/:id/definition-done

POST   /api/sprints/:id/review
POST   /api/sprints/:id/retrospectiva
```

No crear endpoints demasiado genéricos o difíciles de comprender.

---

# 20. Base de datos SQL Server

La base debe ser fácil de explicar durante la defensa técnica.

## Tabla Usuario

```sql
CREATE TABLE Usuario (
    IdUsuario INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(150) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL,
    Rol VARCHAR(30) NOT NULL
);
```

Roles principales:

```text
Product Owner
Scrum Master
Developer
```

---

## Tabla Proyecto

```sql
CREATE TABLE Proyecto (
    IdProyecto INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Descripcion VARCHAR(500),
    ProductGoal VARCHAR(500),
    FechaCreacion DATETIME DEFAULT GETDATE()
);
```

---

## Tabla ProyectoMiembro

```sql
CREATE TABLE ProyectoMiembro (
    IdProyectoMiembro INT IDENTITY(1,1) PRIMARY KEY,
    IdProyecto INT NOT NULL,
    IdUsuario INT NOT NULL,
    RolScrum VARCHAR(30) NOT NULL,

    FOREIGN KEY (IdProyecto) REFERENCES Proyecto(IdProyecto),
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);
```

---

## Tabla HistoriaUsuario

```sql
CREATE TABLE HistoriaUsuario (
    IdHistoria INT IDENTITY(1,1) PRIMARY KEY,
    IdProyecto INT NOT NULL,
    Titulo VARCHAR(150) NOT NULL,
    Descripcion VARCHAR(1000),
    CriteriosAceptacion VARCHAR(1500),
    Prioridad VARCHAR(20),
    StoryPoints INT,
    Estado VARCHAR(30) DEFAULT 'Pendiente',

    FOREIGN KEY (IdProyecto) REFERENCES Proyecto(IdProyecto)
);
```

---

## Tabla Sprint

```sql
CREATE TABLE Sprint (
    IdSprint INT IDENTITY(1,1) PRIMARY KEY,
    IdProyecto INT NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    SprintGoal VARCHAR(500),
    FechaInicio DATE,
    FechaFin DATE,
    Estado VARCHAR(20) DEFAULT 'Planificado',

    FOREIGN KEY (IdProyecto) REFERENCES Proyecto(IdProyecto)
);
```

---

## Tabla SprintHistoria

```sql
CREATE TABLE SprintHistoria (
    IdSprintHistoria INT IDENTITY(1,1) PRIMARY KEY,
    IdSprint INT NOT NULL,
    IdHistoria INT NOT NULL,

    FOREIGN KEY (IdSprint) REFERENCES Sprint(IdSprint),
    FOREIGN KEY (IdHistoria) REFERENCES HistoriaUsuario(IdHistoria)
);
```

---

## Tabla Daily

```sql
CREATE TABLE Daily (
    IdDaily INT IDENTITY(1,1) PRIMARY KEY,
    IdSprint INT NOT NULL,
    IdUsuario INT NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    Avance VARCHAR(500),
    SiguienteTrabajo VARCHAR(500),
    TieneImpedimento BIT DEFAULT 0,

    FOREIGN KEY (IdSprint) REFERENCES Sprint(IdSprint),
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);
```

---

## Tabla Impedimento

```sql
CREATE TABLE Impedimento (
    IdImpedimento INT IDENTITY(1,1) PRIMARY KEY,
    IdSprint INT NOT NULL,
    IdUsuario INT NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Estado VARCHAR(30) DEFAULT 'Abierto',
    FechaCreacion DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (IdSprint) REFERENCES Sprint(IdSprint),
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);
```

---

## Tabla DefinitionDone

```sql
CREATE TABLE DefinitionDone (
    IdDefinitionDone INT IDENTITY(1,1) PRIMARY KEY,
    IdProyecto INT NOT NULL,
    Descripcion VARCHAR(300) NOT NULL,

    FOREIGN KEY (IdProyecto) REFERENCES Proyecto(IdProyecto)
);
```

---

## Tabla HistoriaDefinitionDone

```sql
CREATE TABLE HistoriaDefinitionDone (
    IdHistoriaDefinitionDone INT IDENTITY(1,1) PRIMARY KEY,
    IdHistoria INT NOT NULL,
    IdDefinitionDone INT NOT NULL,
    Cumplido BIT DEFAULT 0,

    FOREIGN KEY (IdHistoria) REFERENCES HistoriaUsuario(IdHistoria),
    FOREIGN KEY (IdDefinitionDone) REFERENCES DefinitionDone(IdDefinitionDone)
);
```

---

## Tabla SprintReview

```sql
CREATE TABLE SprintReview (
    IdSprintReview INT IDENTITY(1,1) PRIMARY KEY,
    IdSprint INT NOT NULL,
    Resultado VARCHAR(1000),
    Feedback VARCHAR(1000),
    Fecha DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (IdSprint) REFERENCES Sprint(IdSprint)
);
```

---

## Tabla Retrospectiva

```sql
CREATE TABLE Retrospectiva (
    IdRetrospectiva INT IDENTITY(1,1) PRIMARY KEY,
    IdSprint INT NOT NULL,
    AspectosPositivos VARCHAR(1000),
    AspectosMejorar VARCHAR(1000),
    Fecha DATETIME DEFAULT GETDATE(),

    FOREIGN KEY (IdSprint) REFERENCES Sprint(IdSprint)
);
```

---

## Tabla AccionMejora

```sql
CREATE TABLE AccionMejora (
    IdAccion INT IDENTITY(1,1) PRIMARY KEY,
    IdRetrospectiva INT NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Responsable VARCHAR(100),
    Estado VARCHAR(30) DEFAULT 'Pendiente',

    FOREIGN KEY (IdRetrospectiva) REFERENCES Retrospectiva(IdRetrospectiva)
);
```

---

# 21. Reglas para SQL

Claude debe:

- mantener nombres en español;
- usar `INT IDENTITY` como claves primarias;
- utilizar claves foráneas explícitas;
- evitar normalización excesiva;
- utilizar `VARCHAR` cuando sea suficiente;
- utilizar `BIT` para valores booleanos;
- utilizar `DATE` o `DATETIME` cuando corresponda;
- evitar lógica de negocio dentro de SQL.

Claude no debe:

- crear triggers;
- crear procedimientos almacenados;
- crear funciones SQL;
- crear vistas complejas;
- introducir patrones difíciles de explicar.

---

# 22. Manejo del estado de historias

Estados válidos iniciales:

```text
Pendiente
En progreso
En revisión
Pruebas
Terminado
```

Crear una constante central para evitar textos duplicados.

Ejemplo:

```ts
export const ESTADOS_HISTORIA = {
  PENDIENTE: 'Pendiente',
  EN_PROGRESO: 'En progreso',
  EN_REVISION: 'En revisión',
  PRUEBAS: 'Pruebas',
  TERMINADO: 'Terminado',
};
```

---

# 23. Reglas Scrum importantes

Claude debe respetar:

- El Product Owner gestiona el Product Backlog.
- El Scrum Master facilita Scrum.
- Los Developers administran su trabajo dentro del Sprint.
- El Scrum Master no debe funcionar como jefe que asigna todas las tareas.
- El Product Owner no debe utilizarse como administrador operativo del equipo.
- El Sprint Goal debe estar relacionado con el trabajo seleccionado.
- El Sprint Backlog debe provenir del Product Backlog.
- Una historia terminada debe cumplir criterios de aceptación y DoD.
- Review y Retrospective son eventos diferentes.

---

# 24. Persistencia

Toda funcionalidad presentada en la demostración debe utilizar información persistida.

No simular como resultado final:

```ts
const historias = [
  ...
];
```

Se pueden utilizar datos temporales únicamente mientras se desarrolla.

La versión final debe consumir la API Node.js y almacenar datos en SQL Server.

---

# 25. Manejo de errores

Todas las operaciones de API deben manejar:

- carga;
- éxito;
- error.

Ejemplo de UX:

```text
Guardando historia...

Historia creada correctamente.

No fue posible guardar la historia.
Intentar nuevamente
```

No mostrar errores técnicos de Node.js o SQL directamente al usuario.

---

# 26. Componentes reutilizables

Crear componentes únicamente cuando aporten reutilización real.

Ejemplos:

```text
TarjetaHistoria
IndicadorProgreso
EtiquetaPrioridad
SelectorEstado
EstadoVacio
BotonPrincipal
EncabezadoPantalla
```

Evitar componentes genéricos excesivos.

---

# 27. Reglas para Claude al modificar código

Antes de realizar un cambio:

1. Leer los archivos relacionados.
2. Entender cómo funciona la implementación actual.
3. Mantener la arquitectura existente cuando sea razonable.
4. No reescribir módulos completos sin necesidad.
5. Realizar el cambio mínimo que resuelva correctamente la historia.
6. Verificar que frontend, API y base de datos sigan siendo compatibles.
7. Mantener todos los nombres nuevos en español.
8. Comentar todas las funciones nuevas.
9. Evitar código innecesariamente complejo.
10. No implementar funcionalidades fuera del alcance solicitado.

---

# 28. Regla de simplicidad

Si existen dos soluciones técnicamente correctas, escoger la que:

1. sea más sencilla;
2. tenga menos código;
3. sea más fácil de demostrar;
4. sea más fácil de explicar;
5. tenga menos dependencias;
6. sea suficientemente estable para el MVP.

No aplicar patrones empresariales únicamente por apariencia de arquitectura.

---

# 29. Orden recomendado de implementación

## Etapa 1

```text
API
→ conexión SQL Server
→ usuarios
→ proyectos
→ equipos
```

## Etapa 2

```text
historias
→ criterios
→ prioridad
→ Story Points
→ Product Backlog
```

## Etapa 3

```text
Sprint
→ Sprint Goal
→ selección de historias
→ Sprint Backlog
```

## Etapa 4

```text
Tablero
→ cambio de estado
→ progreso
```

## Etapa 5

```text
Daily
→ impedimentos
```

## Etapa 6

```text
Definition of Done
→ validación de cierre
```

## Etapa 7

```text
Review
→ Retrospective
→ cierre
→ indicador
```

---

# 30. Criterio de terminado por historia

Una historia solo se considera implementada si:

- existe la interfaz necesaria;
- funciona la lógica;
- consume la API cuando corresponda;
- persiste información cuando corresponda;
- maneja errores básicos;
- puede demostrarse;
- no rompe el flujo principal.

Una pantalla sin funcionalidad no cuenta como terminada.

---

# 31. Criterio de terminado del MVP

El proyecto está listo cuando se puede demostrar esta secuencia sin modificar datos manualmente:

```text
1. Iniciar sesión.
2. Abrir o crear un proyecto.
3. Visualizar el equipo Scrum.
4. Definir Product Goal.
5. Crear historias.
6. Agregar criterios de aceptación.
7. Asignar prioridad.
8. Asignar Story Points.
9. Crear un Sprint.
10. Definir Sprint Goal.
11. Seleccionar historias.
12. Crear Sprint Backlog.
13. Visualizar las historias en el tablero.
14. Cambiar estados.
15. Registrar Daily.
16. Registrar impedimento.
17. Completar Definition of Done.
18. Terminar historias.
19. Ejecutar Sprint Review.
20. Registrar feedback.
21. Ejecutar Retrospective.
22. Registrar acción de mejora.
23. Cerrar Sprint.
24. Visualizar porcentaje de cumplimiento.
```

---

# 32. Prioridad de Claude

Cuando el tiempo sea limitado, Claude debe decidir en este orden:

```text
1. Funcionalidad correcta.
2. Flujo Scrum completo.
3. Persistencia.
4. Estabilidad.
5. UX web.
6. Diseño visual.
7. Refactorización.
8. Funcionalidades adicionales.
```

El diseño debe ser moderno, pero nunca debe impedir terminar el flujo principal.

---

# 33. Restricciones finales obligatorias

Claude NO debe:

- cambiar React por otro framework;
- crear una aplicación alternativa fuera de React;
- reemplazar Node.js;
- reemplazar SQL Server;
- usar triggers;
- usar procedimientos almacenados;
- crear funciones o variables nuevas en inglés;
- generar funciones sin comentario;
- sobrearquitecturar el proyecto;
- implementar módulos secundarios antes del núcleo;
- inventar requisitos que no estén solicitados;
- tratar al Scrum Master como jefe del equipo;
- permitir cerrar historias que incumplan la DoD;
- usar datos simulados como solución final;
- sacrificar funcionalidad por diseño visual.

Claude SÍ debe:

- mantener código sencillo;
- mantener nombres en español;
- documentar brevemente cada función;
- construir una interfaz moderna;
- crear componentes web claros y responsivos;
- implementar APIs sencillas;
- utilizar SQL Server con tablas fáciles de comprender;
- mantener trazabilidad Scrum;
- priorizar historias P0;
- comprobar siempre el flujo completo antes de agregar funcionalidades extra.

---

# 34. Instrucción para cada nueva solicitud

Cuando se solicite implementar una historia o módulo, Claude debe responder internamente en este orden:

```text
1. Identificar la historia y fase.
2. Revisar archivos afectados.
3. Identificar cambios frontend.
4. Identificar cambios backend.
5. Identificar cambios SQL.
6. Implementar únicamente lo necesario.
7. Verificar nombres en español.
8. Verificar comentarios de funciones.
9. Verificar integración completa.
10. Confirmar que la historia es demostrable.
```

No detenerse únicamente en crear la UI cuando la historia requiere persistencia o lógica de backend.

---

# 35. Meta final

El producto debe sentirse como una **aplicación web moderna para ejecutar Scrum**, no como una colección de formularios.

La demostración final debe poder contar una historia clara:

# 36. Info base de datos

Nombre: tiusr15pl_relampagositios
usuariobasedatos: relampagositios
Password: OaxrONmik4&7r4@m
Web donde esta: tiusr15pl.cuc-carrera-ti.ac.cr


> El equipo crea un producto, define su objetivo, prioriza el trabajo, planifica un Sprint, ejecuta las historias mediante un tablero, registra su Daily y sus impedimentos, valida el trabajo con la Definition of Done, inspecciona el incremento en la Review, aprende en la Retrospective y finalmente visualiza el resultado del Sprint.

Ese flujo constituye la columna vertebral del proyecto.
