import {UserPayload} from "./user.payload";
import {QuizPayload} from "./quiz.payload";

export interface UserResponsePayload {
  id: string;
  user: UserPayload;
  quiz: QuizPayload;
}
