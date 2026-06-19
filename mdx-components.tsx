import type { MDXComponents } from "mdx/types";

// Required by @next/mdx with the App Router: this file declares the React
// components made available to every compiled MDX file. The pedagogical
// components (Idee, Exemple, Exercice, Attention, Formateur) are wired in
// here in Task 4 — for now the map is empty so MDX maps to native HTML.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
  return components;
}
