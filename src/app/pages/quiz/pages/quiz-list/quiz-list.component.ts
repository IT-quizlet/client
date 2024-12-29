import { Component } from '@angular/core';
import {ItemSliderComponent} from "../../../../shared/components/item-slider/item-slider.component";
import {TagModule} from "primeng/tag";
import {AvatarModule} from "primeng/avatar";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-quiz-list',
  imports: [
    ItemSliderComponent,
    TagModule,
    AvatarModule,
    RouterModule
  ],
  standalone: true,
  template: `
    <div class="flex flex-col gap-4 p-6">
      <h1 class="px-12 font-bold text-2xl">Popular</h1>

      <div class="flex flex-wrap gap-12 p-6">
          <div
            class='card flex flex-col gap-6 flex-auto min-w-[40%] items-start cursor-pointer hover:shadow-lg'
            routerLink="/quiz/item"
        >
          <h1>Test name</h1>
          <p-tag value="40 terms" [style]="{ background: 'black' }"/>

            <div class="flex gap-2 mt-12 content-center items-center">
              <p-avatar
                label="Z"
                shape="circle"
              />
              <span class="">uZer</span>
              
              <p-tag value="Teacher" [style]="{ background: 'black' }"/>
            </div>
          </div>
      </div>

      <app-item-slider/>
    </div>;
  `
})
export class QuizListComponent {

}
