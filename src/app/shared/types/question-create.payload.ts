import {QuestionPayload} from "./question.payload";

export interface QuestionCreatePayload extends Omit<QuestionPayload, 'id'> {}