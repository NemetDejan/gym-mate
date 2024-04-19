import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUiReducer from './shared/ui.reducer'
import * as fromAuthReducer from './auth/auth.reducer'

export interface State {
  ui: fromUiReducer.State;
  auth: fromAuthReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUiReducer.uiReducer,
  auth: fromAuthReducer.authReducer
}

export const getUiState = createFeatureSelector<fromUiReducer.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUiReducer.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuthReducer.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuthReducer.getIsAuthenticated);
