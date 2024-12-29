import {LevelEnum} from "../enums/level.enum";

export interface QuizCreatePayload {
  title?: string;
  description?: string;
  level?: LevelEnum;
  categories?: string[];
}