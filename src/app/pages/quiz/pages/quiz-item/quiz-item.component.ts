import { Component } from '@angular/core';
import {TagModule} from "primeng/tag";
import {ItemSliderComponent} from "../../../../shared/components/item-slider/item-slider.component";

@Component({
  selector: 'app-quiz-item',
  imports: [
    TagModule,
    ItemSliderComponent
  ],
  standalone: true,
  template: `
    <div class="flex flex-col gap-6 px-[20vw] py-12">
      <h1 class="text-3xl font-bold">Java basic questions</h1>
      <div class="flex items-center gap-2">
        Tag: <p-tag value="oines"/>
      </div>
      <div class="flex items-center gap-2">
        Level: <p-tag value="oines"/>
      </div>
      <div class="flex items-center gap-2">
        <i class="pi pi-users"></i>
        39 studiers recently
      </div>

      <div class="card !border-0 flex flex-col items-center gap-32 !py-24">
        <h1 class="text-4xl font-bolder">Question</h1>

        <div class="flex flex-wrap justify-center gap-2 w-full">
          <span class="card min-w-[45%] cursor-pointer hover:bg-slate-100 !py-2">Answer</span>
          <span class="card min-w-[45%] cursor-pointer hover:bg-slate-100 !py-2">Answer</span>
          <span class="card min-w-[45%] cursor-pointer hover:bg-slate-100 !py-2">Answer</span>
          <span class="card min-w-[45%] cursor-pointer hover:bg-slate-100 !py-2">Answer</span>
        </div>
      </div>

      <app-item-slider/>
    </div>
  `,
})
export class QuizItemComponent {

}
