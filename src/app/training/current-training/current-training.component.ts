import {Component, OnInit} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {StopTrainingComponent} from "./stop-training.component";
import { TrainingService } from "../training.service";

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatButton
  ],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.scss'
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer: NodeJS.Timeout;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
    ) {
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    // TODO: fiddle with this in order to accommodate more exercises, perhaps replace with something else...
    // 20sec to finish the exercise
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step)
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef: MatDialogRef<StopTrainingComponent> = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
