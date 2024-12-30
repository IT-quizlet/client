import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, of, switchMap, tap} from "rxjs";
import {UserPayload} from "../../shared/types/user.payload";
import {environment} from "../../../environments/environment";
import {UserLoginPayload} from "../../shared/types/user-login.payload";
import {AuthResponsePayload} from "../../shared/types/auth-response.payload";
import {UserRegisterPayload} from "../../shared/types/user-register.payload";
import {ToastService} from "../../shared/services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly loggedUser = signal<UserPayload | null>(null);

  private readonly tokenKey = 'auth_token';
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  constructor() {
    const token = this.getToken();

    if (token) {
      this.getMe().subscribe();
    }
  }

  get BASE_URL() {
    return `${environment.API_BASE}/auth`;
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  login(credentials: UserLoginPayload) {
    return this.http.post<AuthResponsePayload>(`${this.BASE_URL}/login`, credentials).pipe(
      tap(({ token }) => this.setToken(token)),
      switchMap(() => this.getMe()),
      catchError(() => {
        this.toastService.show('error', 'Error', 'Something went wrong')
        return of(null);
      }),
    );
  }

  register(user: UserRegisterPayload) {
    return this.http.post<AuthResponsePayload>(`${this.BASE_URL}/register`, user)
      .pipe(
        tap(({ token }) => this.setToken(token)),
        switchMap(() => this.getMe()),
        catchError(() => {
          this.toastService.show('error', 'Error', 'Something went wrong')
          return of(null);
        }),
      );
  }

  getMe() {
    return this.http.get<UserPayload>(`${this.BASE_URL}/me`)
      .pipe(
        tap((user) => this.loggedUser.set(user)),
      );
  }

  logout() {
    this.clearToken();
    this.loggedUser.set(null);
  }
}