import type { MDXComponents } from "mdx/types";
import { Idee, Exemple, Exercice, Attention } from "@/components/learn/mdx-blocks";
import { Formateur } from "@/components/learn/Formateur";
import { Quiz, Question, Choice } from "@/components/learn/quiz/Quiz";

// Required by @next/mdx with the App Router: this file declares the React
// components made available to every compiled MDX file. Base HTML elements
// (h2, p, ul, a…) inherit the `.prose` styles from the lesson template;
// only the pedagogical components are mapped here.
const components: MDXComponents = {
  Idee,
  Exemple,
  Exercice,
  Attention,
  Formateur,
  Quiz,
  Question,
  Choice,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
