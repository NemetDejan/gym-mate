import {
  ActivatedRouteSnapshot,
  CanActivateFn, CanMatchFn, Route,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromAppReducer from './auth.reducer';
import { take } from "rxjs";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store: Store = inject(Store);

  return store.select(fromAppReducer.getIsAuthenticated).pipe(take(1));
}

// used mostly for lazy loaded components not to load the packages
export const canMatchAuthGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const store: Store = inject(Store);

  return store.select(fromAppReducer.getIsAuthenticated).pipe(take(1));
}
