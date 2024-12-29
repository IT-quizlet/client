import { Component } from '@angular/core';
import {HeaderComponent} from "../../core/components/header/header.component";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    RouterModule
  ],
  standalone: true,
  template: `
    <div class="bg-orange-50">
      <app-header/>
      <main class="min-h-[100vh] w-full pt-[100px]">
        <router-outlet/>
      </main>
    </div>
  `,
})
export class MainComponent {

}
