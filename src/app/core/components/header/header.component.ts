import {Component, inject} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  standalone: true,
  template: `
    <header
      class='py-4 px-[6vw] flex justify-between content-center w-full bg-white border-b border-slate-800 fixed z-10'
    >
      <section class='flex gap-10 content-center leading-8'>
        <h1 class='font-bold text-[20px]'>IT Quizlet</h1>
        <h2 class='text-[17px] cursor-pointer' routerLink="/">Home</h2>
        
        @if (authService.loggedUser()) {
          <h2 class='text-[17px] cursor-pointer' routerLink="/quiz/list">Quizes</h2>
          <button class='btn filled w-[93px] h-full' routerLink="/quiz/create">Create</button>
        }
      </section>

      <section class='flex gap-10'>
        @if (!authService.loggedUser()) {
          <button class='btn outlined w-[93px] h-full' routerLink="/auth/login">Login</button>
        } @else {
          <button class='btn outlined w-[93px] h-full' (click)="onLogout()">Logout</button>
        }
      </section>
        
    </header>
  `,
})
export class HeaderComponent {
  readonly authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
