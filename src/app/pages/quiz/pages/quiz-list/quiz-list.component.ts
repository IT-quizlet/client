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

@Component({
  selector: 'app-quiz-list',
  imports: [
    ItemSliderComponent,
    AvatarModule,
    RouterModule,
    CommonModule,
    TagModule,
    PaginatePipe
  ],
  standalone: true,
  template: `
    <div class="flex flex-col gap-4 p-6">
      <h1 class="px-12 font-bold text-2xl">Popular</h1>

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

  readonly itemsPerPage = 4;
  readonly quizService = inject(QuizService);

  get totalPages() {
    return Math.ceil(this.quizzes.length / this.itemsPerPage);
  }

  ngOnInit() {
    this.quizService.getALlQuizzes()
      .pipe(
        first(),
        tap((quizzes) => this.quizzes = quizzes)
      )
      .subscribe();
  }
}
