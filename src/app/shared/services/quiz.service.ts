import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {QuizPayload} from "../types/quiz.payload";
import {QuizFilterPayload} from "../types/quiz-filter.payload";
import {LevelEnum} from "../enums/level.enum";
import {QuizUpdatePayload} from "../types/quiz-update.payload";
import {QuestionPayload} from "../types/question.payload";
import {QuizCreatePayload} from "../types/quiz-create.payload";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly httpClient = inject(HttpClient);

  get BASE_URL() {
    return `${environment.API_BASE}/quizzes`
  }

  getQuizById(id: string) {
    return this.httpClient.get<QuizPayload>(`${this.BASE_URL}/${id}`);
  }

  getALlQuizzes(params: QuizFilterPayload) {
    return this.httpClient.get<QuizPayload[]>(
      this.BASE_URL,
      { params: new HttpParams({ fromObject: params as Record<string, LevelEnum | string[]> }) }
    );
  }

  deleteQuizById(id: string) {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`);
  }

  getQuizQuestions(id: string) {
    return this.httpClient.get<QuestionPayload[]>(`${this.BASE_URL}/${id}/questions`);
  }

  createQuiz(quiz: QuizCreatePayload) {
    return this.httpClient.post<QuizPayload>(this.BASE_URL, quiz);
  }
}
