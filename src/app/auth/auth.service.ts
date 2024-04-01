import {UserModel} from "./user.model";
import {AuthDataModel} from "./auth-data.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
  authChange:Subject<boolean> = new Subject<boolean>();
  private user: UserModel | undefined | null;

  constructor(private router: Router) {
  }

  registerUser(authDate: AuthDataModel) {
    this.user = {
      email: authDate.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.successfullLogin();
  }

  loginUser(authDate: AuthDataModel) {
    this.user = {
      email: authDate.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.successfullLogin();
  }

  logoutUser() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  private successfullLogin() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
