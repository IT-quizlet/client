import {LevelEnum} from "../enums/level.enum";

export interface QuizPayload {
  id: string;
  title: string;
  description: string;
  level: LevelEnum;
  categories: string[];
}
