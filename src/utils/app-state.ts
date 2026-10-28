
import type { Country } from "../types/country";

// Estados posibles durante la carga de países.
export type AppState =
  | { status: "loading" }
  | { status: "success"; data: Country[] }
  | { status: "error"; message: string };
