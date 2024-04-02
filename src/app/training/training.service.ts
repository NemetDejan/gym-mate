import { ExerciseModel } from "./exercise.model";
import { map, Subject, Subscription } from "rxjs";
import { inject, Injectable } from "@angular/core";
import {
  addDoc,
  collection,
  collectionData,
  collectionSnapshots,
  Firestore,
  getFirestore
} from "@angular/fire/firestore";
import { initializeApp } from "@angular/fire/app";
import { environment } from "../../environments/environment";
import { UiService } from "../shared/ui.service";

@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<ExerciseModel>();
  exercisesChanged = new Subject<ExerciseModel[]>();
  finishedExercisesChanged = new Subject<ExerciseModel[]>();
  private availableExercises: ExerciseModel[] = [];
  private runningExercise: ExerciseModel;
  private firebaseSubs: Subscription[] = [];

  private firestore: Firestore = inject(Firestore);
  // Initialize Firebase
  firebaseApp = initializeApp(environment.firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  fireStoreDB = getFirestore(this.firebaseApp);

  constructor(
    private uiService: UiService
  ) {
  }

  getAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
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
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          error: () => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar('Fetching exercises failed. Please try again later.', null, 2000);
            this.exercisesChanged.next(null);
          }
        })
    );
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getCompletedOrCanceledExercises() {
    const finishedExercisesCollection = collection(this.firestore, 'finishedExercises');
    this.firebaseSubs.push(
      collectionData(finishedExercisesCollection)
        .subscribe({
          next: (exercises: ExerciseModel[]) => {
            this.finishedExercisesChanged.next(exercises)
          },
          error: (error) => {
            console.log(error);
          }
        })
    )
  }

  startExercise(selectedExerciseId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedExerciseId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: "completed" });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "canceled"
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
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
