import {Component, inject, OnInit} from '@angular/core';
import {TagModule} from "primeng/tag";
import {ItemSliderComponent} from "../../../../shared/components/item-slider/item-slider.component";
import {QuizService} from "../../../../shared/services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, filter, first, forkJoin, of, switchMap, tap} from "rxjs";
import {QuizPayload} from "../../../../shared/types/quiz.payload";
import {QuestionPayload} from "../../../../shared/types/question.payload";
import {CommonModule} from "@angular/common";
import {PaginatePipe} from "../../../../shared/pipes/paginate.pipe";
import {FormControl, NonNullableFormBuilder, Validators} from "@angular/forms";
import {QuestionAnswerPayload} from "../../../../shared/types/question-answer.payload";
import {toObservable} from "@angular/core/rxjs-interop";
import {AuthService} from "../../../../core/services/auth.service";

interface UserAnswer extends QuestionPayload {
  answer: FormControl<string>;
}

@Component({
  selector: 'app-quiz-item',
  imports: [
    TagModule,
    ItemSliderComponent,
    CommonModule,
    PaginatePipe,
  ],
  standalone: true,
  template: `
    <div class="flex flex-col gap-6 px-[20vw] py-12" *ngIf="quiz">
      <h1 class="text-3xl font-bold">{{ quiz.title }}</h1>
      <div class="flex items-center gap-2" *ngIf="quiz.categories.length">
        Level: <p-tag severity="secondary" [rounded]="true" [value]="quiz.level"/>
      </div>

      <div class="flex items-center gap-2">
        Categories: 
        <p-tag 
          severity="secondary" 
          *ngFor="let category of quiz.categories"
          [value]="category" 
          [rounded]="true"
        />
      </div>
      
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <i class="pi pi-users"></i>
          {{ totalQuizResponses }} studiers recently
        </div>
        
        <button
          class="btn filled w-[93px] h-10"
          *ngIf="currentQuestion && currentUserAnswer && !resultAnswers"
          (click)="onQuizSubmit()"
          [class.disabled]="!isAnswersValid()"
        >Submit</button>
      </div>

      <div class="card !border-0 flex flex-col items-center gap-32 !py-24">
        <ng-container *ngIf="currentQuestion && currentUserAnswer && !resultAnswers">
          <h1 class="text-4xl font-bolder">{{ currentQuestion.text }}</h1>
  
          <div class="flex flex-wrap justify-center gap-2 w-full">
            <span 
              class="card min-w-[45%] cursor-pointer hover:bg-slate-500 !py-2"
              [class.!bg-slate-500]="currentUserAnswer.answer.value === variant"
              (click)="onCurrentUserAnswerSelect(variant)"
              *ngFor="let variant of currentQuestion.variants"
            >{{ variant }}</span>
          </div>
        </ng-container>
        
        <span class="text-2xl text-slate-800" *ngIf="resultAnswers">
          You have answered correctly to {{ getCorrectAnswersAmount() }} questions
        </span>
        
        <ng-container *ngIf="!(currentQuestion && currentUserAnswer)">
          <h1 class="text-4xl font-bolder">No questions</h1>
        </ng-container>
      </div>

      <app-item-slider
        (pageSelected)="onQuestionSelect($event)"
        [current]="currentQuestionPage"
        [total]="questions.length"
        *ngIf="!resultAnswers"
      />
    </div>
  `,
})
export class QuizItemComponent implements OnInit {
  totalQuizResponses = 0;
  currentQuestionPage = 0;
  quiz!: QuizPayload;
  questions: QuestionPayload[] = [];
  userAnswers: UserAnswer[] = [];
  currentQuestion!: QuestionPayload;
  currentUserAnswer!: UserAnswer;
  resultAnswers!: QuestionAnswerPayload[];

  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly nonNullableFormBuilder = inject(NonNullableFormBuilder);

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        first(),
        switchMap(({ id }) => this.quizService.getQuizById(id)),
        catchError(() => {
          this.router.navigate(['/quiz/list']);
          return of(null);
        }),
        filter(Boolean),
        tap((quiz) => this.quiz = quiz),
        switchMap(({ id }) => this.quizService.getQuizResponses(id)),
        tap((responses) => this.totalQuizResponses = responses.length),
        switchMap(() => this.quizService.getQuizQuestions(this.quiz.id)),
        tap((questions) => {
          this.questions = questions;
          this.userAnswers = questions.map((question) => ({
            ...question,
            answer: this.nonNullableFormBuilder.control('', Validators.required)
          }));
          this.currentQuestion = this.questions[0];
          this.currentUserAnswer = this.userAnswers[0];

          if (questions.length) this.currentQuestionPage = 1;
        }),
      )
      .subscribe();
  }

  onCurrentUserAnswerSelect(answer: string) {
    this.currentUserAnswer.answer.setValue(answer);
  }

  onQuestionSelect(index: number) {
    this.currentQuestion = this.questions[index - 1];
    this.currentUserAnswer = this.userAnswers[index - 1];
    this.currentQuestionPage = index;
  }

  isAnswersValid() {
    return this.userAnswers.every(({ answer }) => answer.valid);
  }

  onQuizSubmit() {
    if (this.isAnswersValid()) {
      const answers = this.userAnswers.map(({ id, answer }) => ({ questionId: id, answer: answer.getRawValue() }));

      this.quizService.createQuizResponse(this.quiz.id)
        .pipe(
          switchMap(({ id }) =>
            forkJoin(
              ...answers.map(({ questionId, answer }) => this.quizService.addAnswerToResponse(id, questionId, answer))
            )
          ),
          tap((resultAnswers) => this.resultAnswers = resultAnswers),
        )
        .subscribe(console.log);
    }
  }

  getCorrectAnswersAmount() {
    return this.resultAnswers.filter(({ isCorrect }) => isCorrect).length;
  }
}
