import {QuizPayload} from "./quiz.payload";

export interface QuizCreatePayload extends Omit<QuizPayload, 'id'> {}
