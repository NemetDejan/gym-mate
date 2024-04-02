import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { AuthDataModel } from "./auth-data.model";
import { TrainingService } from "../training/training.service";
import { UiService } from "../shared/ui.service";

@Injectable()
export class AuthService {
  authChange: Subject<boolean> = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService
  ) {
  }

  initAuthListener() {
    this.fireAuth.authState.subscribe({
      next: user => {
        if (user) {
          this.isAuthenticated = true;
          this.authChange.next(true);
          this.router.navigate(['/training']);
        } else {
          this.trainingService.cancelSubscriptions();
          this.authChange.next(false);
          this.router.navigate(['/login']);
          this.isAuthenticated = false;
        }
      }
    })
  }

  registerUser(authData: AuthDataModel) {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        console.log(error);
        // TODO: integrate translation for the error msg
        this.uiService.showSnackbar(error.message);
      });
  }

  loginUser(authData: AuthDataModel) {
    this.uiService.loadingStateChanged.next(true);
    this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        console.log(error);
        // TODO: integrate translation for the error msg
        this.uiService.showSnackbar(error.message);
      });
  }

  logoutUser() {
    this.fireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
