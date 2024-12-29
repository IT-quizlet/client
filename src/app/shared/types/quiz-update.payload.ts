import {QuizPayload} from "./quiz.payload";

export interface QuizUpdatePayload extends Partial<Omit<QuizPayload, 'id'> >{}