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
- Abrir el detalle en `/country/:code`, con consulta local por código y enlaces a los países fronterizos.


### Diseño de las tarjetas

- Menos de 20rem de ancho de tarjeta: bandera a la izquierda (2/5) e información a la derecha (3/5).
- Desde 20rem: bandera arriba, a todo el ancho y con 218px de alto; información debajo.
- El umbral pertenece a la tarjeta mediante `@container`, no al ancho de pantalla.
- Se conservan los tokens de color, la superficie blanca, la región como texto y el control naranja “Ver más”.
- El grid utiliza una, dos, tres o cuatro columnas según el breakpoint; desde `xl` utiliza cuatro.
- Los tres registros son una comprobación temporal. Con cuatro columnas queda una posición libre.

“Ver más” abre la ruta de detalle del país seleccionado. No se incorpora un interruptor de tema.

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
| `src/hooks/useCountryDetail.ts` | Consulta el detalle por código de ruta y administra carga, error y reintento. |
| `src/hooks/useSearch.ts` | Administra búsqueda, región, debounce y países visibles. |
| `src/api/countries.ts` | Lee el JSON local y proporciona funciones de consulta de países. |
| `src/utils/country-codes.ts` | Convierte códigos de frontera ISO alpha-3 a alpha-2 para las rutas. |

| `src/components/atoms/Flag.tsx` | Muestra la bandera y su respaldo. |
| `src/components/atoms/Badge.tsx` | Muestra la región como texto. |
| `src/components/molecules/CountryCard.tsx` | Compone la información de un país y su acción. |
| `src/components/organisms/CountryGrid.tsx` | Renderiza la colección recibida con claves estables. |
| `src/components/organisms/SiteHeader.tsx` | Barra superior, enlaces de sección y menú móvil. |
| `src/components/organisms/Header.tsx` | Compone el título y contenido recibido mediante children. |
| `src/components/organisms/CountryStates.tsx` | Componentes para carga, error y ausencia de resultados. |
| `src/pages/CountryDetailPage.tsx` | Presenta el detalle consultado y los enlaces a países fronterizos. |
| `src/data/countries-demo.ts` | Conserva registros de demostración; la aplicación consulta el JSON local. |
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

### `useCountryDetail(code)`

Normaliza el código de la ruta y consulta `fetchCountryByCode()`. Descarta resultados de una selección anterior, expone los estados de carga/error/éxito y permite reintentar.

## Fuente de datos

La aplicación utiliza registros locales definidos en:

```text
public/data/countries.json
```

La lectura se realiza a través de `src/api/countries.ts`, utilizando `fetch` y `import.meta.env.BASE_URL`.

**Importante:** la aplicación actual utiliza una copia local de REST Countries. No consulta la API externa en cada búsqueda ni necesita una API key para ejecutar esta versión. Los datos no se actualizan automáticamente.

## Alcance actual

La S25 de Canvas / S21 de la programación configuró el proyecto y creó el primer componente. Las sesiones posteriores incorporaron componentes, búsqueda, filtros y rutas de detalle. La aplicación conserva los datos en `public/data/countries.json` y no consulta una API externa durante la ejecución.

## Versión anterior

La implementación Vanilla TypeScript se conserva en:

https://github.com/Kcruz080492/ExplorerApp

## Autora

Karla Cecilia Cruz de González  
Diseño Web Adaptable  
Universidad de Oriente — UNIVO