import { ExerciseModel } from "./exercise.model";
import { map, Subscription, take } from "rxjs";
import { inject, Injectable } from "@angular/core";
import {
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  Firestore,
  getFirestore
} from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { initializeApp } from "@angular/fire/app";

import { environment } from "../../environments/environment";
import { UiService } from "../shared/ui.service";
import * as UI from '../shared/ui.actions';
import * as fromTrainingReducer from '../training/training.reducer';
import * as TrainingActions from '../training/training.actions';

@Injectable()
export class TrainingService {
  private firebaseSubs: Subscription[] = [];
  private firestore: Firestore = inject(Firestore);
  // Initialize Firebase
  firebaseApp = initializeApp(environment.firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  fireStoreDB = getFirestore(this.firebaseApp);

  constructor(
    private uiService: UiService,
    private store: Store<fromTrainingReducer.State>
  ) {
  }

  getAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    const exercisesCollection = collection(this.firestore, 'availableExercises');
    this.firebaseSubs.push(
      collectionSnapshots(exercisesCollection)
        .pipe(map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              // ...doc.data(),  not working, TS not recognising the fields and throws error when assigning the type
              id: doc.id,
              name: doc.data()['name'],
              duration: doc.data()['duration'],
              calories: doc.data()['calories']
            }
          })
        }))
        .subscribe({
          next: (exercises: ExerciseModel[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new TrainingActions.SetAvailableTrainings(exercises));
          },
          error: () => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar('Fetching exercises failed. Please try again later.', null, 2000);
          }
        })
    );
  }

  getCompletedOrCanceledExercises() {
    const finishedExercisesCollection = collection(this.firestore, 'finishedExercises');
    this.firebaseSubs.push(
      collectionData(finishedExercisesCollection)
        .subscribe({
          next: (exercises: ExerciseModel[]) => {
            this.store.dispatch(new TrainingActions.SetFinishedTrainings(exercises));
          },
          error: (error) => {
            console.log(error);
          }
        })
    )
  }

  startExercise(selectedExerciseId: string) {
    this.store.dispatch(new TrainingActions.StartTraining(selectedExerciseId));
  }

  completeExercise() {
    this.store.select(fromTrainingReducer.getActiveTraining).pipe(take(1)).subscribe((exercise: ExerciseModel) => {
      this.addDataToDatabase({
        ...exercise,
        date: new Date(),
        state: "completed"
      });
      this.store.dispatch(new TrainingActions.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTrainingReducer.getActiveTraining).pipe(take(1)).subscribe((exercise: ExerciseModel) => {
      this.addDataToDatabase({
        ...exercise,
        duration: exercise.duration * (progress / 100),
        calories: exercise.calories * (progress / 100),
        date: new Date(),
        state: "canceled"
      });
      this.store.dispatch(new TrainingActions.StopTraining());
    });
  }

  private addDataToDatabase(exercise: ExerciseModel) {
    // Add a new document with a generated id, returns promise
    addDoc(collection(this.fireStoreDB, 'finishedExercises'), exercise);
  }

  cancelSubscriptions() {
    if (this.firebaseSubs) {
      this.firebaseSubs.forEach((sub: Subscription) => sub.unsubscribe());
    }
  }
}
