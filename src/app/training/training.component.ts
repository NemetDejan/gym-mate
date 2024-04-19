import { Component, OnInit } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingComponent} from "./past-traininga/past-training.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import { Store } from "@ngrx/store";

import {TrainingService} from "./training.service";
import * as fromTrainingReducer from './training.reducer'
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    NewTrainingComponent,
    PastTrainingComponent,
    CurrentTrainingComponent,
    AsyncPipe
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTrainingReducer.getIsTrainingActive);
  }
}
