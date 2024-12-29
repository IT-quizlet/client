import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full"
  },
  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/main/pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'quiz',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: "full"
          },
          {
            path: 'list',
            loadComponent: () => import('./pages/quiz/pages/quiz-list/quiz-list.component').then(m => m.QuizListComponent),
          },
          {
            path: 'item',
            loadComponent: () => import('./pages/quiz/pages/quiz-item/quiz-item.component').then(m => m.QuizItemComponent),
          },
          {
            path: 'create',
            loadComponent: () => import('./pages/quiz/pages/quiz-create/quiz-create.component').then(m => m.QuizCreateComponent),
          }
        ]
      },
      {
        path: 'account-settings',
        loadComponent: () => import('./pages/account-settings/account-settings.component').then(m => m.AccountSettingsComponent),
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('./core/pages/auth/auth.component').then(m => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./core/pages/auth/pages/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('./core/pages/auth/pages/register/register.component').then(m => m.RegisterComponent),
      },
    ],
  },
]
