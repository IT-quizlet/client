import {Component, inject} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-home',
  imports: [
    RouterModule
  ],
  standalone: true,
  template: `
    <main
      class='flex flex-col items-center justify-center gap-20'
    >
      <div class='flex flex-col items-center justify-center gap-2 max-w-[770px] text-center'>
        <h1 class='text-nowrap text-[48px] font-jetbrains-mono'>Підготуйтесь до IT-співбесіди</h1>
        <p class='text-[20px] pb-8 font-jetbrains-mono'>
          Попрактикуйтеся в реальних питаннях співбесіди,
          перевірте свої знання та готуйтеся досягти успіху в ІТ
        </p>

        @if (!authService.loggedUser()) {
          <button class='btn filled py-4 px-16' routerLink="/auth/signup">Register</button>
        }
      </div>

      <div class='flex gap-16'>
        <img src="main-gallery-1.png" alt='Gallery 1 image'/>
        <img src="main-gallery-2.png" alt='Gallery 2 image'/>
        <img src="main-gallery-3.png" alt='Gallery 3 image'/>
      </div>
    </main>
  `,
})
export class HomeComponent {
  readonly authService = inject(AuthService);
}
