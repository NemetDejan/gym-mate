import { Component, OnInit } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {MatOption, MatSelect} from "@angular/material/select";
import { FormsModule, NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AsyncPipe } from "@angular/common";

import {ExerciseModel} from "../exercise.model";
import {TrainingService} from "../training.service";
import * as fromAppReducer from "../../app.reducer";
import * as fromTrainingReducer from "../training.reducer";


@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    MatProgressSpinner,
    AsyncPipe
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<ExerciseModel[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTrainingReducer.State>
  ) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromAppReducer.getIsLoading);
    this.exercises$ = this.store.select(fromTrainingReducer.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
