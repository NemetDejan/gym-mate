import { Routes } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component";
import { canMatchAuthGuard } from "./auth/auth.guard";
import { authRoutes } from "./auth/auth.routes";

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    title: 'Welcome',
    component: WelcomeComponent
  },
  {
    path: 'training',
    title: 'Training',
    loadComponent: () => import('./training/training.component').then(
      mod => mod.TrainingComponent
    ),
    canMatch: [canMatchAuthGuard]
  }
];
