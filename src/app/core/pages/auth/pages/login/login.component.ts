import {Component, inject} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {filter, first, tap} from "rxjs";
import {InputText, InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  standalone: true,
  template: `
    <div class='max-w-[400px] w-full flex flex-col items-center justify-center gap-[70px] tracking-widest'>
      <h1 class='text-[35px] tracking-[8%]'>Sign-in</h1>
      <div class="w-full flex flex-col items-center justify-center gap-8">
        <input
          pInputText
          class='w-full'
          placeholder='Email'
          type='email'
          [formControl]="loginFrom.controls.username"
        />

        <input
          pInputText
          class='w-full'
          placeholder='Password'
          type='password'
          [formControl]="loginFrom.controls.password"
        />
      </div>

      <div class='w-full flex flex-col items-center justify-center gap-4 focus:outline-none focus:ring-0'>
        <button
          class='w-full btn filled !bg-[#5B86E5] py-2'
          (click)="onLogin()"
        >Login
        </button>
        <p class='tracking-[8%] text-[12px] font-[Inter]'>
          Don’t have an account?
          <span class='text-slate-800 cursor-pointer' routerLink="/auth/signup">Signup Here</span>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  readonly formBuilder = inject(NonNullableFormBuilder);
  readonly loginFrom = this.formBuilder.group({
    username: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required),
  })

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onLogin() {
    this.authService.login(this.loginFrom.getRawValue())
      .pipe(
        first(),
        filter(Boolean),
        tap(() => this.router.navigate(['/'])),
      )
      .subscribe();
  }
}
