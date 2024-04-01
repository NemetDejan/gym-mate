import {Component, OnInit} from '@angular/core';
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormsModule, NgForm} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatCheckbox} from "@angular/material/checkbox";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    FormsModule,
    MatHint,
    MatError,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatLabel,
    MatSuffix,
    MatCheckbox
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  public maxDate: Date = new Date();

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
