import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(), provideFirebaseApp(() => initializeApp({ projectId: "simple-crm-9fc1b", appId: "1:999757668502:web:861c56f73b9f695af862b7", storageBucket: "simple-crm-9fc1b.firebasestorage.app", apiKey: "AIzaSyBp2n_ZjxgLQXrIMovrUCY_lA0Eeg9nAOg", authDomain: "simple-crm-9fc1b.firebaseapp.com", messagingSenderId: "999757668502", measurementId: "G-ZRWT1388X1" })), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
  ],
};
