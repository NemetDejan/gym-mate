import { Routes } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {TrainingComponent} from "./training/training.component";
import {authGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    component: WelcomeComponent
  },
  {
    path: 'signup',
    title: 'Signup',
    component: SignupComponent
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: 'training',
    title: 'Training',
    component: TrainingComponent,
    canActivate: [authGuard]
  }
];
