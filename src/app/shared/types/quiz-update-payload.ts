import {QuizInterface} from "./quiz.interface";

export interface QuizUpdatePayload extends Partial<Omit<QuizInterface, 'id'> >{}