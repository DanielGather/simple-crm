import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  imports: [
    FormsModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatProgressBarModule,
    NgIf,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  constructor() {}
  readonly dialog = inject(MatDialogRef);
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate: Date = new Date();

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('user', this.user);

    const userCollection = collection(this.firestore, 'users');
    addDoc(userCollection, this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log(result);
        this.dialog.close();
      })
      .catch((error: any) => {
        console.log('Ging nicht', error);
      });
  }
}
