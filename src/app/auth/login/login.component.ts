import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { MatError, MatFormField, MatHint } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { UiService } from "../../shared/ui.service";
import { Subscription } from "rxjs";

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
    MatProgressSpinner
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = this.formBuilder.group({
    email: ['', {
      validators: [Validators.required, Validators.email]
    }],
    password: ['', { validators: [Validators.required] }]
  });

  isLoading: boolean = false;
  private loadingSubs: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService
  ) {
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }

  onSubmit() {
    this.authService.loginUser({
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    });
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
