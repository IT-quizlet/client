import {Component, inject} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {filter, first, tap} from "rxjs";
import {InputText, InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  template: `
    <div class='max-w-[400px] w-full flex flex-col items-center justify-center gap-[60px] tracking-widest'>
      <div class="flex flex-col gap-6 items-center justify-center">
        <h1 class='text-[35px]'>Create an Account</h1>
        <div class="flex flex-col gap-4 items-center justify-center">
          <div class="flex gap-40">
            <img class='h-16 w-16 cursor-pointer' src="logo-google.png" alt="Google"/>
            <img class='h-16 w-16 cursor-pointer' src="logo-facebook.png" alt="Facebook"/>
          </div>
          <div class='flex gap-2 items-center'>
            <span class='h-[2px] w-6 bg-[#838383]'></span>
            <span class='font-[Inter] text-2xl text-[#838383]'>OR</span>
            <span class='h-[2px] w-6 bg-[#838383]'></span>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col items-center justify-center gap-8">
        <input
          pInputText
          class='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
          placeholder='Username'
          type='text'
          [formControl]="registerFrom.controls.username"
        />

        <input
          pInputText
          class='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
          placeholder='Email'
          type='email'
          [formControl]="registerFrom.controls.email"
        />

        <input
          pInputText
          class='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
          placeholder='Password'
          type='password'
          [formControl]="registerFrom.controls.password"
        />

        <input
          pInputText
          class='w-full border-[#9D9D9D] border-b-[1px] focus:outline-none focus:ring-0'
          placeholder='Avatar URL'
          type='text'
          [formControl]="registerFrom.controls.avatarUrl"
        />
      </div>

      <div class='w-full flex flex-col items-center justify-center gap-4'>
        <button 
          class='w-full btn filled !bg-[#5B86E5] py-2'
          (click)="onRegister()"
        >Create account</button>
        
        <p class='tracking-[8%] text-[12px] font-[Inter]'>
          Already have an account? 
          <span class='text-slate-800 cursor-pointer' routerLink="/auth/login">Login</span>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  readonly formBuilder = inject(NonNullableFormBuilder);
  readonly registerFrom = this.formBuilder.group({
    username: this.formBuilder.control('', Validators.required),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', Validators.required),
    avatarUrl: this.formBuilder.control(''),
  })

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  onRegister() {
    this.authService.register(this.registerFrom.getRawValue())
      .pipe(
        first(),
        filter(Boolean),
        tap(() => this.router.navigate(['/'])),
      )
      .subscribe();
  }
}
