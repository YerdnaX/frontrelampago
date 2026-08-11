# Relámpago Scrum — Frontend

Aplicación web en React (Vite) para gestionar proyectos bajo Scrum: equipos, Product Backlog, Sprints, tablero, Daily e impedimentos.

## Instalación y ejecución

```bash
npm install
cp .env.example .env   # URL de la API backend
npm run dev
```

## Fase Integrante 02 — Sprint y ejecución

Planificación y ejecución del Sprint sobre el Product Backlog creado por el Integrante 01.

Historias implementadas: HU-049 (crear Sprint), HU-052 (Sprint Goal), HU-056 (visualizar backlog priorizado), HU-058 (seleccionar historias), HU-059 (Story Points comprometidos), HU-061 (crear Sprint Backlog), HU-068 (tablero visual), HU-069 (mover tarjetas), HU-074 (Daily Scrum), HU-077 (crear impedimento desde el Daily), HU-081 (estado del impedimento).

### Pantallas nuevas

```text
/proyectos/:id/sprints                          Lista de Sprints del proyecto y creación de un Sprint nuevo
/proyectos/:id/sprints/:idSprint                 Resumen del Sprint: Sprint Goal, indicadores y accesos
/proyectos/:id/sprints/:idSprint/planificacion   Sprint Planning: Product Backlog + selección + Sprint Backlog
/proyectos/:id/sprints/:idSprint/tablero         Tablero Kanban (Pendiente, En progreso, En revisión, Pruebas, Terminado)
/proyectos/:id/sprints/:idSprint/daily           Registro y consulta del Daily Scrum
/proyectos/:id/sprints/:idSprint/impedimentos    Lista de impedimentos y cambio de estado
```

Se accede desde la tarjeta "Sprints" dentro del detalle de un proyecto.

### Componentes nuevos

`TarjetaSprint`, `FormularioSprint`, `SprintGoalDestacado`, `BarraProgresoSprint`, `FilaHistoriaPlanificacion`, `ResumenStoryPoints`, `ColumnaTablero`, `TarjetaTablero`, `SelectorEstadoHistoria`, `FormularioDaily`, `TarjetaImpedimento`, `EtiquetaEstadoImpedimento`.

El tablero soporta arrastrar y soltar tarjetas entre columnas, y además ofrece un selector accesible por teclado como alternativa al arrastre.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
