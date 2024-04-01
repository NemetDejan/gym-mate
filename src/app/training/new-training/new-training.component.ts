import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {TrainingService} from "../training.service";
import {ExerciseModel} from "../exercise.model";
import { FormsModule, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

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
    FormsModule
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss'
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: ExerciseModel[];
  exercisesSubscription: Subscription;

  constructor(
    private trainingService: TrainingService
  ) {
  }

  ngOnInit() {
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.trainingService.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }
}
