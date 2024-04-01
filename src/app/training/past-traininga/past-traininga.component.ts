import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from "@angular/material/table";
import { DatePipe, DecimalPipe } from "@angular/common";
import { ExerciseModel } from "../exercise.model";
import { TrainingService } from "../training.service";
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-past-traininga',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    DatePipe,
    DecimalPipe,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatFormField,
    MatInput,
    MatPaginator
  ],
  templateUrl: './past-traininga.component.html',
  styleUrl: './past-traininga.component.scss'
})
export class PastTrainingaComponent implements OnInit, AfterViewInit, OnDestroy {
  private pastTrainingsSubscription: Subscription;
  dataSource = new MatTableDataSource<ExerciseModel>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort) sortExercises: MatSort;
  @ViewChild(MatPaginator) exercisesPaginator: MatPaginator;

  constructor(
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.trainingService.getCompletedOrCanceledExercises();
    this.pastTrainingsSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: ExerciseModel[]) => {
      this.dataSource.data = exercises;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sortExercises;
    this.dataSource.paginator = this.exercisesPaginator;
  }

  doFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.pastTrainingsSubscription.unsubscribe();
  }
}
