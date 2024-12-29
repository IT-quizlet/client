import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-auth',
  imports: [
    RouterModule,
  ],
  standalone: true,
  template: `
    <div class="bg-indigo-200 w-full min-h-[100vh] flex font-[Akshar]">
      <section class='hidden w-[27%] min-h-full xl:flex flex-col justify-center content-center'>
        <h1 class='font-semibold text-[60px] px-[82px] flex flex-col justify-center'>
          <span class='text-white'>Prepare, Practice &</span>
          <span class='text-indigo-600'>Ace Your IT Interviews</span>
        </h1>
        <img src="logo-login.png" alt='some logo'/>
      </section>

      <section class='rounded-none w-full min-h-full bg-white flex flex-col justify-center items-center xl:rounded-s-[50px]'>
        <router-outlet/>
      </section>
    </div>
  `
})
export class AuthComponent {

}
