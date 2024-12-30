import {Component, inject, OnInit} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {TextareaModule} from "primeng/textarea";
import {DropdownModule} from "primeng/dropdown";
import {QuizService} from "../../../../shared/services/quiz.service";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {LevelEnum} from "../../../../shared/enums/level.enum";
import {CommonModule} from "@angular/common";
import {catchError, filter, forkJoin, of, switchMap, tap} from "rxjs";
import {QuestionCreatePayload} from "../../../../shared/types/question-create.payload";
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-create',
  imports: [
    InputTextModule,
    TextareaModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule
  ],
  standalone: true,
  template: `
    <div class="flex flex-col gap-12 px-[20vw]">
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-bolder">Create quiz</h1>
        <input 
          pInputText 
          placeholder="Enter title" 
          [formControl]="createQuizForm.controls.title"
        />
        
        <input 
          pTextarea
          placeholder="Add description"
          class="max-h-[20rem] min-h-[5rem]" 
          [formControl]="createQuizForm.controls.description"
        />

        <div class="flex gap-6">
          <p-dropdown 
            placeholder="Select tag" 
            class="input !p-0" 
            [options]="levels"
            [formControl]="createQuizForm.controls.level"
          />
        </div>
        
        <div class="flex items-center flex-wrap gap-4">
          <h1 class="text-xl font-bolder">Categories:</h1>
          <div 
            class="flex items-center gap-2" 
            *ngFor="let category of categoriesFromArray.controls; let i = index"
          >
            <i class="pi pi-trash cursor-pointer" (click)="removeCategory(i)"></i>
            <input pTextarea placeholder="Category" type="text" [formControl]="category">
          </div>
          
          <i class="pi pi-plus-circle text-2xl cursor-pointer" (click)="addCategory()"></i>
        </div>
      </div>
      
      <button
        class="btn filled self-end px-8 py-2"
        [disabled]="!isQuizValid()"
        [class.disabled]="!isQuizValid()"
        (click)="onQuizCreate()"
      >
        Create
      </button>

      <div class="flex flex-col gap-4 pb-12">
        <div 
          class="card flex flex-col gap-12 !px-4 !py-2 !pb-6"
          *ngFor="let question of questionsFromArray.controls; let i = index"
        >
          <span
            class="text-sm border-b border-slate-300 pb-2 flex justify-between"
          >
            {{ i }}
            <i class="pi pi-trash cursor-pointer" (click)="removeQuestion(i)"></i>
          </span>

          <div class="flex items-stretch gap-4">
            <input
              pInputText
              class='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0 text-sm'
              placeholder="Term"
              [formControl]="question.controls.term"
            />

            <input
              pInputText
              class='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0 text-sm'
              placeholder="Definition"
              [formControl]="question.controls.definition"
            />
          </div>
        </div>

        <i class="pi pi-plus-circle text-2xl cursor-pointer self-center" (click)="addQuestion()"></i>
      </div>
    </div>
  `
})
export class QuizCreateComponent implements OnInit{
  readonly levels = Object.values(LevelEnum);
  readonly formBuilder = inject(NonNullableFormBuilder);
  readonly categoriesFromArray = this.formBuilder.array<string>([]);
  readonly questionsFromArray = this.formBuilder.array<
    FormGroup<{ term: FormControl<string>, definition: FormControl<string> }>
  >([]);
  readonly createQuizForm = this.formBuilder.group({
    title: this.formBuilder.control('', Validators.required),
    description: this.formBuilder.control('', Validators.required),
    level: this.formBuilder.control(this.levels[0], Validators.required),
  });

  private readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.questionsFromArray.push(this.formBuilder.group({
      term: this.formBuilder.control('', Validators.required),
      definition: this.formBuilder.control('', Validators.required)
    }));

    this.categoriesFromArray.push(this.formBuilder.control('', Validators.required));
  }

  onQuizCreate() {
    if (!this.isQuizValid()) {
      return;
    }

    this.quizService.createQuiz({
      ...this.createQuizForm.getRawValue(),
      categories: this.categoriesFromArray.getRawValue(),
    })
      .pipe(
        switchMap((quiz) => {
          const questions = this.getQuestionsPayload();

          return forkJoin(
            ...questions.map(
              (question) => this.quizService.addQuestionToQuiz(quiz.id, question)
            )
          );
        }),
        catchError(() => of(null)),
        filter(Boolean),
        tap(() => this.router.navigate(['/quiz/list']))
      )
      .subscribe();
  }


  addCategory() {
    this.categoriesFromArray.push(this.formBuilder.control('', Validators.required));
  }

  removeCategory(index: number) {
    this.categoriesFromArray.removeAt(index);
  }

  addQuestion() {
    this.questionsFromArray.push(this.formBuilder.group({
      term: this.formBuilder.control('', Validators.required),
      definition: this.formBuilder.control('', Validators.required),
    }));
  }

  removeQuestion(index: number) {
    this.questionsFromArray.removeAt(index);
  }

  isQuizValid() {
    return this.createQuizForm.valid &&
      this.questionsFromArray.controls.every(question => question.valid) &&
      this.categoriesFromArray.controls.every(category => category.valid);
  }

  getQuestionsPayload() {
    const rawQuestions = this.questionsFromArray.getRawValue();

    return this.generateQuizzes(rawQuestions);
  }

  private generateQuizzes(rawQuestions: { term: string; definition: string }[]): QuestionCreatePayload[] {
    const allDefinitions = rawQuestions.map((q) => q.definition);

    return rawQuestions.map(({ term, definition }) => {
      const wrongAnswers = allDefinitions
        .filter((def) => def !== definition)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      return {
        text: term,
        correctAnswer: definition,
        variants: [definition, ...wrongAnswers].sort(() => Math.random() - 0.5),
      };
    });
  }
}
