import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Store } from "@ngrx/store";

import { AuthDataModel } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import { UiService } from "../shared/ui.service";

import * as fromAppReducer from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromAppReducer.State>
  ) {
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe({
      next: user => {
        if (user) {
          this.store.dispatch(new Auth.SetAuthenticated());
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscriptions();
          this.router.navigate(['/login']);
          this.store.dispatch(new Auth.SetUnauthenticated());
        }
      }
    })
  }

  registerUser(authData: AuthDataModel) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
        // TODO: integrate translation for the error msg
        this.uiService.showSnackbar(error.message);
      });
  }

  loginUser(authData: AuthDataModel) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading());
        console.log(error);
        // TODO: integrate translation for the error msg
        this.uiService.showSnackbar(error.message);
      });
  }

  logoutUser() {
    this.fireAuth.signOut();
  }
}
