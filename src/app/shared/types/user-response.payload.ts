import {UserPayload} from "./user.payload";
import {QuizInterface} from "./quiz.interface";

export interface UserResponsePayload {
  id: string;
  user: UserPayload;
  quiz: QuizInterface
}
