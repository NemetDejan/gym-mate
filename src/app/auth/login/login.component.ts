import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { MatError, MatFormField, MatHint } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromAppReducer from '../../app.reducer';
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatHint,
    MatError,
    MatProgressSpinner,
    AsyncPipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', { validators: [Validators.required] }]
  });

  isLoading$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<fromAppReducer.State>
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromAppReducer.getIsLoading);
  }

  onSubmit() {
    this.authService.loginUser({
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    });
  }
}
