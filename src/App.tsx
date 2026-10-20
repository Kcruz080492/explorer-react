import type { JSX } from "react";
import { Header } from "./components/organisms/Header";
import { CountryGrid } from "./components/organisms/CountryGrid";
import { countriesDemo } from "./data/countries-demo";


export default function App(): JSX.Element {
  function handleSelect(code: string): void {
    // Comprobación temporal: el detalle se conectará con el enrutamiento.
    console.log("País seleccionado:", code);
  } 

  return (

<main className="min-h-screen bg-neutral-50 px-4 py-10 text-neutral-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <Header title="Explora países del mundo">
          <p>Explorer App: migración de la interfaz a componentes React.</p>
        </Header>
        <CountryGrid countries={countriesDemo} onSelect={handleSelect} />
      </div>
    </main>
  );
}
