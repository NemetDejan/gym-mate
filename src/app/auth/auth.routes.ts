import { Route } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";

export const authRoutes: Route[] = [
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
]
