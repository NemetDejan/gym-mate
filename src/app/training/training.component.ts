import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingaComponent} from "./past-traininga/past-traininga.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {Subscription} from "rxjs";
import {TrainingService} from "./training.service";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    NewTrainingComponent,
    PastTrainingaComponent,
    CurrentTrainingComponent
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit{
  ongoingTraining: boolean = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      });
  }
}
