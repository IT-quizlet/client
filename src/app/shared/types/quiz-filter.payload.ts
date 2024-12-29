import {LevelEnum} from "../enums/level.enum";

export interface QuizFilterPayload {
  level?: LevelEnum;
  category?: string[];
}
