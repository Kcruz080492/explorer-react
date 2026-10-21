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

## Avance actual: S26 en Canvas / S22 de la programación

La aplicación muestra tres países de ejemplo:

- El Salvador.
- Japón.
- Canadá.

Cada tarjeta presenta bandera, nombre, población, región y capital.

`App` compone `Header` y `CountryGrid`. El grid recibe `Country[]`, crea las tarjetas con `map()` y utiliza `codes.alpha_2` como `key` estable. `CountryCard` combina `Flag` y `Badge`, y comunica la selección mediante una función prop tipada.

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
| `src/App.tsx` | Compone Header y CountryGrid; proporciona los países y la función de selección. |
| `src/components/atoms/Flag.tsx` | Muestra la bandera y su respaldo. |
| `src/components/atoms/Badge.tsx` | Muestra la región como texto. |
| `src/components/molecules/CountryCard.tsx` | Compone la información de un país y su acción. |
| `src/components/organisms/CountryGrid.tsx` | Renderiza la colección recibida con claves estables. |
| `src/components/organisms/Header.tsx` | Compone el título y contenido recibido mediante children. |
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

La S25 de Canvas / S21 de la programación configuró el proyecto y creó el primer componente. La S26 de Canvas / S22 de la programación organiza componentes y su composición.

La búsqueda reactiva y los filtros se incorporarán al trabajar estado y formularios. La conexión de `api/countries.ts` con `public/data/countries.json` se realizará con `useEffect` en S25 de la programación. La navegación al detalle se incorporará en las etapas de React Router. El objetivo sigue siendo migrar toda Explorer App.

## Versión anterior

La implementación Vanilla TypeScript se conserva en:

https://github.com/Kcruz080492/ExplorerApp

## Autora

Karla Cecilia Cruz de González  
Diseño Web Adaptable  
Universidad de Oriente — UNIVO