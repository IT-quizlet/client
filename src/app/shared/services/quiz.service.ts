import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {QuizPayload} from "../types/quiz.payload";
import {QuizFilterPayload} from "../types/quiz-filter.payload";
import {LevelEnum} from "../enums/level.enum";
import {QuestionPayload} from "../types/question.payload";
import {QuizCreatePayload} from "../types/quiz-create.payload";
import {UserResponsePayload} from "../types/user-response.payload";
import {QuestionAnswerPayload} from "../types/question-answer.payload";
import {QuestionCreatePayload} from "../types/question-create.payload";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly httpClient = inject(HttpClient);

  get QUIZ_BASE_URL() {
    return `${environment.API_BASE}/quizzes`
  }

  get RESPONSE_BASE_URL() {
    return `${environment.API_BASE}/responses`
  }

  getQuizById(id: string) {
    return this.httpClient.get<QuizPayload>(`${this.QUIZ_BASE_URL}/${id}`);
  }

  getALlQuizzes(quizFilters?: QuizFilterPayload) {
    const params = quizFilters ? new HttpParams({ fromObject: quizFilters as Record<string, LevelEnum | string[]> }) : {};

    return this.httpClient.get<QuizPayload[]>(this.QUIZ_BASE_URL, { params });
  }

  deleteQuizById(id: string) {
    return this.httpClient.delete<void>(`${this.QUIZ_BASE_URL}/${id}`);
  }

  getQuizQuestions(id: string) {
    return this.httpClient.get<QuestionPayload[]>(`${this.QUIZ_BASE_URL}/${id}/questions`);
  }

  addQuestionToQuiz(quizId: string, questions: QuestionCreatePayload) {
    return this.httpClient.post<QuestionPayload>(`${this.QUIZ_BASE_URL}/${quizId}/questions`, questions);
  }

  createQuiz(quiz: QuizCreatePayload) {
    return this.httpClient.post<QuizPayload>(this.QUIZ_BASE_URL, quiz);
  }

  getQuizResponses(id: string) {
    return this.httpClient.get<UserResponsePayload[]>(`${this.RESPONSE_BASE_URL}/by-quiz/${id}`);
  }

  createQuizResponse(quizId: string) {
    return this.httpClient.post<UserResponsePayload>(`${this.RESPONSE_BASE_URL}?quizId=${quizId}`, {});
  }

  addAnswerToResponse(responseId: string, questionId: string, answer: string) {
    return this.httpClient.post<QuestionAnswerPayload>(
      `${this.RESPONSE_BASE_URL}/${responseId}/answers?questionId=${questionId}`,
      { answer }
    );
  }
}
