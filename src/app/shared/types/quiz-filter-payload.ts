import {LevelEnum} from "../enums/level.enum";

export interface QuizFilterPayload {
  level?: LevelEnum;
  categories?: string[];
}
