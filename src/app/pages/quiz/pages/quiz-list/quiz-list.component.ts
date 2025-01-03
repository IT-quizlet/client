import {Component, inject, OnInit} from '@angular/core';
import {ItemSliderComponent} from "../../../../shared/components/item-slider/item-slider.component";
import {Tag, TagModule} from "primeng/tag";
import {AvatarModule} from "primeng/avatar";
import {RouterModule} from "@angular/router";
import {QuizService} from "../../../../shared/services/quiz.service";
import {CommonModule} from "@angular/common";
import {PaginatePipe} from "../../../../shared/pipes/paginate.pipe";
import {first, tap} from "rxjs";
import {QuizPayload} from "../../../../shared/types/quiz.payload";
import {LevelEnum} from "../../../../shared/enums/level.enum";
import {SelectModule} from "primeng/select";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {QuizFilterPayload} from "../../../../shared/types/quiz-filter.payload";

@Component({
  selector: 'app-quiz-list',
  imports: [
    ItemSliderComponent,
    AvatarModule,
    RouterModule,
    CommonModule,
    TagModule,
    PaginatePipe,
    SelectModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  standalone: true,
  template: `
    <div class="flex flex-col gap-4 p-6">
      <div class="flex gap-4">
        <p-select
          placeholder="Select level"
          [options]="levels"
          [formControl]="levelSearchControl"
        />

        <input pInputText type="text" placeholder="Category" [formControl]="categorySearchControl">

        <button class="btn filled h-10 px-4" (click)="setQuizzes()">
          Apply filters
        </button>

        <button class="btn outlined h-10 px-4" (click)="removeFilters()">
          Reset filters
        </button>
      </div>

      <div class="flex flex-wrap gap-12 p-6">
        <div
          class='card flex flex-col gap-6 flex-auto w-[40%] items-start cursor-pointer hover:shadow-xl'
          [routerLink]="'/quiz/item/' + quiz.id"
          *ngFor="let quiz of quizzes | paginate: currentPage : itemsPerPage"
        >
          <h1>{{ quiz.title }}</h1>

          <span class="text-sm">{{ quiz.description }}</span>

          <p-tag severity="secondary" [rounded]="true" [value]="quiz.level"/>
        </div>
      </div>

      <app-item-slider
        (pageSelected)="currentPage = $event"
        [current]="currentPage"
        [total]="totalPages"
      />
    </div>
  `
})
export class QuizListComponent implements OnInit {
  currentPage = 1;
  quizzes: QuizPayload[] = [];
  levelSearchControl = new FormControl<string | null>(null);
  categorySearchControl = new FormControl<string | null>(null);
  levels = Object.values(LevelEnum);

  readonly itemsPerPage = 4;
  readonly quizService = inject(QuizService);

  get totalPages() {
    return Math.ceil(this.quizzes.length / this.itemsPerPage);
  }

  ngOnInit() {
    this.setQuizzes();
  }

  setQuizzes() {
    const filters: QuizFilterPayload = {};

    if (this.levelSearchControl.value) filters.level = this.levelSearchControl.value as LevelEnum;
    if (this.categorySearchControl.value) filters.category = this.categorySearchControl.value;

    this.quizService.getALlQuizzes(filters)
      .pipe(
        first(),
        tap((quizzes) => this.quizzes = quizzes)
      )
      .subscribe();
  }

  removeFilters() {
    this.levelSearchControl.reset();
    this.categorySearchControl.reset();
    this.setQuizzes();
  }
}
