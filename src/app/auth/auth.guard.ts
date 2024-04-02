import {
  ActivatedRouteSnapshot,
  CanActivateFn, CanMatchFn, Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuth()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}

// used mostly for lazy loaded components not to load the packages
export const canMatchAuthGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isAuth()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
