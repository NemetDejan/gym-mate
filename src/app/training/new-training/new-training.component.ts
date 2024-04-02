import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import { FormsModule, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

import {ExerciseModel} from "../exercise.model";
import {TrainingService} from "../training.service";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { UiService } from "../../shared/ui.service";

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
    MatProgressSpinner
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: ExerciseModel[];
  private newTrainingSubs: Subscription[] = [];

  isLoading: boolean = true;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {
  }

  ngOnInit() {
    this.newTrainingSubs.push(this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }));
    this.newTrainingSubs.push(this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    }));
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.newTrainingSubs) {
      this.newTrainingSubs.forEach((sub: Subscription) => sub.unsubscribe());
    }
  }
}
