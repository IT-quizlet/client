import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {TextareaModule} from "primeng/textarea";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-quiz-create',
  imports: [
    InputTextModule,
    TextareaModule,
    DropdownModule
  ],
  standalone: true,
  template: `
    <div class="flex flex-col gap-12 px-[20vw]">
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-bolder">Create quiz</h1>
        <input pInputText placeholder="Enter title" class="input"/>
        <input pTextarea placeholder="Add description" class="input max-h-[20rem] min-h-[5rem]"/>

        <div class="flex gap-6">
          <p-dropdown placeholder="Select tag" class="input !p-0"/>
          <p-dropdown placeholder="Select Level" class="input !p-0"/>
        </div>
      </div>

      <div class="flex flex-col gap-4 pb-12">
        <div class="card flex flex-col gap-12 !px-4 !py-2 !pb-6">
          <span
            class="text-sm border-b border-slate-300 pb-2 flex justify-between"
          >
            {{ 0 }}
            <i class="pi pi-trash cursor-pointer" (click)="null"></i>
          </span>

          <div class="flex items-stretch gap-4">
            <input
              class='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0 text-sm'
              placeholder="Term"
            />

            <input
              class='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0 text-sm'
              placeholder="Definition"
            />
          </div>
        </div>

        <i class="pi pi-plus-circle text-2xl cursor-pointer self-center" (click)="null"></i>
      </div>

    </div>
  `
})
export class QuizCreateComponent {
}
