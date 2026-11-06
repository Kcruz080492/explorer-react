# Explorer App — React

Aplicación académica para explorar información de países, desarrollada en la asignatura Diseño Web Adaptable de la Universidad de Oriente (UNIVO).

Esta versión inicia la migración del proyecto Vanilla TypeScript a React mediante componentes funcionales y props tipadas.

## Tecnologías

- React 18.
- TypeScript.
- Vite.
- Tailwind CSS v4.
- pnpm.
- Git y GitHub.
- Datos de REST Countries almacenados en un archivo JSON local.

## Avance actual: S30 en Canvas
La aplicación permite:

- Consultar países a partir de una copia local de datos de REST Countries.
- Mostrar **ocho países destacados** al iniciar, cuando no hay filtros activos.
- Buscar países por nombre con **debounce de 300 ms**.
- Filtrar países por región y combinar ambos criterios.
- Mostrar estados de interfaz de **carga**, **error** y **sin resultados**, con opción de reintentar la carga.
- Visualizar tarjetas adaptables con bandera, nombre, población, región y capital.
- Utilizar navegación de secciones y menú móvil, con cierre mediante la tecla `Escape`.

**Alcance pendiente:** el control «Ver más» todavía registra el código del país en la consola; la navegación al detalle con React Router aún no está integrada.


### Diseño de las tarjetas

- Menos de 20rem de ancho de tarjeta: bandera a la izquierda (2/5) e información a la derecha (3/5).
- Desde 20rem: bandera arriba, a todo el ancho y con 218px de alto; información debajo.
- El umbral pertenece a la tarjeta mediante `@container`, no al ancho de pantalla.
- Se conservan los tokens de color, la superficie blanca, la región como texto y el control naranja “Ver más”.
- El grid utiliza una, dos, tres o cuatro columnas según el breakpoint; desde `xl` utiliza cuatro.
- Los tres registros son una comprobación temporal. Con cuatro columnas queda una posición libre.

“Ver más” comprueba actualmente el callback mostrando el código en consola; la navegación al detalle se integrará con React Router. No se incorpora un interruptor de tema.

## Requisitos

- Node.js compatible con la versión de Vite instalada. Para la rama Node 22, utiliza la versión 22.12 o posterior.
- pnpm.
- Git.

Puedes comprobar las herramientas desde la terminal:

```bash
node -v
pnpm -v
git --version
```

## Descargar el proyecto

```bash
git clone https://github.com/Kcruz080492/explorer-react.git
cd explorer-react
```

## Instalar las dependencias

```bash
pnpm install
```

## Ejecutar en desarrollo

```bash
pnpm dev
```

Abre en el navegador la dirección que indique la terminal.

Para detener el servidor, presiona `Ctrl + C`.

## Generar la versión de producción

```bash
pnpm build
```

Este comando comprueba TypeScript y genera los archivos de producción en `dist`.

Para revisar el resultado localmente:

```bash
pnpm preview
```

## Archivos principales

| Archivo | Responsabilidad |
| --- | --- |
| `src/main.tsx` | Monta la aplicación React e importa los estilos globales. |
| `src/App.tsx` |  Integra los Custom Hooks, los eventos de búsqueda y los componentes de interfaz. |
| `src/hooks/useCountries.ts` | Carga países, administra estados de carga/error/éxito y permite reintentar. |
| `src/hooks/useSearch.ts` | Administra búsqueda, región, debounce y países visibles. |
| `src/api/countries.ts` | Lee el JSON local y proporciona funciones de consulta de países. |

| `src/components/atoms/Flag.tsx` | Muestra la bandera y su respaldo. |
| `src/components/atoms/Badge.tsx` | Muestra la región como texto. |
| `src/components/molecules/CountryCard.tsx` | Compone la información de un país y su acción. |
| `src/components/organisms/CountryGrid.tsx` | Renderiza la colección recibida con claves estables. |
| `src/components/organisms/SiteHeader.tsx` | Barra superior, enlaces de sección y menú móvil. |
| `src/components/organisms/Header.tsx` | Compone el título y contenido recibido mediante children. |
| `src/components/organisms/CountryStates.tsx` | Componentes para carga, error y ausencia de resultados. |
| `src/data/countries-demo.ts` | Contiene los tres países utilizados en esta práctica. |
| `src/types/country.ts` | Define las interfaces de los datos de países. |
| `src/types/country-detail.ts` | Define los datos para la consulta detallada. |
| `src/utils/format.ts` | Formatea la población y obtiene la capital y la descripción de la bandera. |
| `src/utils/filter.ts` | Filtra los países por nombre y región. |
| `src/utils/app-state.ts` | Define los estados tipados de la carga. |
| `src/index.css` | Integra Tailwind CSS y conserva los tokens de diseño. |
| `public/placeholder.png` | Imagen de respaldo cuando una bandera no está disponible. |

## Custom Hooks

### `useCountries()`

Centraliza la obtención de datos mediante `fetchCountries()`, utilizando `useEffect`, `useState` y `AbortController`. Devuelve:

- `state`: estado discriminado `loading`, `success` o `error`.
- `retry()`: función para volver a intentar la carga.

### `useSearch(countries)`

Recibe un arreglo `Country[]` y concentra el estado de la búsqueda y del selector de región. Aplica un debounce de **300 ms** y reutiliza `filterCountries()`.

Devuelve `query`, `debouncedQuery`, `region`, `visibleCountries`, `setQuery` y `setRegion`.

Cuando no existen filtros activos, limita la visualización a **ocho países**. Cuando el usuario busca o selecciona una región, muestra los resultados correspondientes.

Esta separación permite que `App.tsx` coordine la interfaz sin implementar directamente la lógica de carga ni de filtrado.

## Fuente de datos

En esta etapa se utilizan tres objetos locales definidos en:

```text
public/data/countries.json
```

La lectura se realiza a través de `src/api/countries.ts`, utilizando `fetch` y `import.meta.env.BASE_URL`.

**Importante:** la aplicación actual utiliza una copia local de REST Countries. No consulta la API externa en cada búsqueda ni necesita una API key para ejecutar esta versión. Los datos no se actualizan automáticamente.

## Alcance actual

La S25 de Canvas / S21 de la programación configuró el proyecto y creó el primer componente. La S26 de Canvas / S22 de la programación organiza componentes y su composición.

La búsqueda reactiva y los filtros se incorporarán al trabajar estado y formularios. La conexión de `api/countries.ts` con `public/data/countries.json` se realizará con `useEffect` en S25 de la programación. La navegación al detalle se incorporará en las etapas de React Router. El objetivo sigue siendo migrar toda Explorer App.

## Versión anterior

La implementación Vanilla TypeScript se conserva en:

https://github.com/Kcruz080492/ExplorerApp

## Autora

Karla Cecilia Cruz de González  
Diseño Web Adaptable  
Universidad de Oriente — UNIVO