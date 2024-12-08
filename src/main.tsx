import { createRoot } from 'react-dom/client'
import './index.scss'
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { PrimeReactProvider } from 'primereact/api';
import React from 'react';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import { Auth } from './core/auth/components/auth/Auth.tsx';
import {Login} from "./core/auth/components/login/Login.tsx";
import {SignUp} from "./core/auth/components/sign-up/SignUp.tsx";
import {ResetPassword} from "./core/auth/components/reset-password/ResetPassword.tsx";
import {ForgotPassword} from "./core/auth/components/forgot-password/ForgotPassword.tsx";
import {Main} from "./pages/main/Main.tsx";
import {Home} from "./pages/main/components/Home.tsx";
import {QuizList} from "./pages/quiz/quiz-list/QuizList.tsx";
import {QuizItem} from "./pages/quiz/quiz-item/QuizItem.tsx";
import {AccountSettings} from "./pages/account-settings/AccountSettings.tsx";
import {QuizCreate} from "./pages/quiz/quiz-create/QuizCreate.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: '',
        element: <Main />,
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'quiz',
            children: [
              {
                index: true,
                element: <Navigate to="/quiz/list" replace />,
              },
              {
                path: 'list',
                element: <QuizList />,
              },
              {
                path: 'item',
                element: <QuizItem />,
              },
              {
                path: 'create',
                element: <QuizCreate />,
              }
            ]
          },
          {
            path: 'account-settings',
            element: <AccountSettings />,
          },
        ]
      },
      {
        path: 'auth',
        element: <Auth />,
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'signup',
            element: <SignUp />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={ router } />
    </PrimeReactProvider>
  </React.StrictMode>
)
