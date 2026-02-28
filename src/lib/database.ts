import { s241701 } from "@/data/s241701";
import { s241703 } from "@/data/s241703";
import { s241705 } from "@/data/s241705";
import { s241707 } from "@/data/s241707";
import { s241709 } from "@/data/s241709";
import { s241711 } from "@/data/s241711";
import { s241713 } from "@/data/s241713";
import { s241715 } from "@/data/s241715";
import { s241717 } from "@/data/s241717";

export interface Suggestion {
  id: string;
  question: string;
  answer: string | null;
}

export interface PhilosophySubject {
  subjectCode: string;
  subjectName: string;
  partA: Suggestion[];
  partB: Suggestion[];
  partC: Suggestion[];
};

export const philosophySubjects: PhilosophySubject[] = [
  s241701,
  s241703,
  s241705,
  s241707,
  s241709,
  s241711,
  s241713,
  s241715,
  s241717,
];
