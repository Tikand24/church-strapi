import type { Media } from "./common";

export interface Priest{
  name: string;
  serviceInitialDate: string;
  image: Media;
  grade: PriestGrade;
}
export interface PriestGroup{
  title: string;
  description: string;
  PriestList: Array<Priest>;
}
export interface PriestGroupProps{
  title: string;
  description: string;
  PriestList: Array<Priest>;
}