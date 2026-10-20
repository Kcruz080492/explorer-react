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

## Avance de la S21

La aplicación muestra tres países de ejemplo:

- El Salvador.
- Japón.
- Canadá.

Cada tarjeta presenta bandera, nombre, población, región y capital.

El componente `CountryCard` se reutiliza con diferentes objetos de tipo `Country`. Las tarjetas incorporan diseño adaptable mediante Container Queries, efecto hover y estilos para modo oscuro según la preferencia del sistema.

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
| `src/App.tsx` | Organiza la pantalla y proporciona los países a las tarjetas. |
| `src/components/CountryCard.tsx` | Representa un país mediante un componente con props tipadas. |
| `src/data/countries-demo.ts` | Contiene los tres países utilizados en esta práctica. |
| `src/types/country.ts` | Define las interfaces de los datos de países. |
| `src/utils/format.ts` | Formatea la población y obtiene la capital y la descripción de la bandera. |
| `src/index.css` | Integra Tailwind CSS y conserva los tokens de diseño. |
| `public/placeholder.png` | Imagen de respaldo cuando una bandera no está disponible. |

## Fuente de datos

En esta etapa se utilizan tres objetos locales definidos en:

`src/data/countries-demo.ts`

Los registros proceden de la copia de datos de REST Countries utilizada en el proyecto Vanilla. Son datos estáticos y no se actualizan automáticamente.

La aplicación no realiza consultas al endpoint de países ni necesita una API key para esta práctica.

Las banderas utilizan direcciones externas. Si una imagen falla, el componente intenta mostrar `public/placeholder.png`.

## Alcance actual

La S25 se concentra en configurar el proyecto, utilizar JSX y crear el primer componente reutilizable.

La búsqueda reactiva, los filtros, la carga de datos con `useEffect` y la navegación al detalle se incorporarán en las siguientes etapas.

## Versión anterior

La implementación Vanilla TypeScript se conserva en:

https://github.com/Kcruz080492/ExplorerApp

## Autora

Karla Cecilia Cruz de González  
Diseño Web Adaptable  
Universidad de Oriente — UNIVO