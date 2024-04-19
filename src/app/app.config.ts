import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from "@angular/material/core";
import { AuthService } from "./auth/auth.service";
import { TrainingService } from "./training/training.service";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from "../environments/environment";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { UiService } from "./shared/ui.service";
import { provideState, provideStore } from '@ngrx/store';
import { reducers } from "./app.reducer";
import { trainingReducer } from "./training/training.reducer";
import { provideStoreDevtools } from "@ngrx/store-devtools";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideStore(reducers),
    // when providing lazy loaded reducer
    provideState('training', trainingReducer),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebaseConfig))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideFunctions(() => getFunctions())),
    importProvidersFrom(provideMessaging(() => getMessaging())),
    importProvidersFrom(provideStorage(() => getStorage())),
    AuthService,
    TrainingService,
    UiService,
  ]
};
