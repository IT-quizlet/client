import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {Avatar} from "primeng/avatar";

@Component({
  selector: 'app-account-settings',
  imports: [
    DropdownModule,
    Avatar
  ],
  standalone: true,
  template: `
    <div class="px-12 flex gap-12 flex-col content-left">
      <div class="flex items-center gap-4 mb-6">
        <h1 class="font-bold text-xl">Account Name</h1>
        <p-avatar label="Z" size="large" shape="circle"/>
      </div>

      <div class="flex flex-col gap-6">
        <h2 class="text-xl">Statistics</h2>
        <p-dropdown placeholder="Created tests" class="input w-[25rem]"/>
        <p-dropdown placeholder="Passed tests" class="input w-[25rem]"/>
      </div>

<!--      <div class="flex flex-col gap-6">-->

<!--        <h2 class="text-xl">Settings</h2>-->
<!--        <div class="flex gap-4">-->
<!--          <div class="card flex flex-col gap-6">-->
<!--            <InputText class="input" value="John Doe"/>-->
<!--            <button class="btn filled w-fit px-3">Change name</button>-->
<!--          </div>-->
<!--          <div class="card flex flex-col gap-6">-->
<!--            <InputText class="input" value="JohnDoe@gmail.com"/>-->
<!--            <button class="btn filled w-fit px-3">Change email</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  `,
})
export class AccountSettingsComponent {

}
