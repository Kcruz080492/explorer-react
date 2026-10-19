// main.tsx — monta App e importa el CSS global.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement: HTMLElement | null = document.getElementById("root");
if (!rootElement) {
  throw new Error("No se encontró el elemento #root en index.html.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
