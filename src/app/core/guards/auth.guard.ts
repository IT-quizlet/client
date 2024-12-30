import {inject, Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);

  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    if (!this.authService.loggedUser()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
