import { Action } from "@ngrx/store";
import { ExerciseModel } from "./exercise.model";

export const SET_AVAILABLE_TRAININGS = '[Trainings] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Trainings] Set Finished Trainings';
export const START_TRAINING = '[Trainings] Start Training';
export const STOP_TRAINING = '[Trainings] Stop Training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: ExerciseModel[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: ExerciseModel[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions =
  SetAvailableTrainings |
  SetFinishedTrainings |
  StartTraining |
  StopTraining;
