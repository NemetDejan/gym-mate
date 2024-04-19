import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { MatSort, MatSortHeader } from "@angular/material/sort";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { Store } from "@ngrx/store";

import { ExerciseModel } from "../exercise.model";
import { TrainingService } from "../training.service";
import * as fromTrainingReducer from '../training.reducer';

@Component({
  selector: 'app-past-training',
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
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.scss'
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sortExercises: MatSort;
  @ViewChild(MatPaginator) exercisesPaginator: MatPaginator;
  dataSource = new MatTableDataSource<ExerciseModel>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTrainingReducer.State>
  ) {}

  ngOnInit() {
    this.trainingService.getCompletedOrCanceledExercises();
    this.store.select(fromTrainingReducer.getFinishedExercises).subscribe((exercises: ExerciseModel[]) => {
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
}
