import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions
} from "./training.actions";
import { ExerciseModel } from "./exercise.model";

import * as fromAppReducer from '../app.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TrainingState {
  availableExercises: ExerciseModel[];
  finishedExercises: ExerciseModel[];
  activeTraining: ExerciseModel;
}

export interface State extends fromAppReducer.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
}

export function trainingReducer(state: TrainingState = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: { ...state.availableExercises.find((exercise: ExerciseModel) => exercise.id === action.payload) }
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvailableExercises = createSelector(
  getTrainingState, (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState, (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState, (state: TrainingState) => state.activeTraining
);
export const getIsTrainingActive = createSelector(
  getTrainingState, (state: TrainingState) => state.activeTraining != null
);

