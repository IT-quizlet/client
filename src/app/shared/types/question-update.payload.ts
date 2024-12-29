import {QuestionPayload} from "./question.payload";

export interface QuestionUpdatePayload extends Partial<Omit<QuestionPayload, 'id'>> {}