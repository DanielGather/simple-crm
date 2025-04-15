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
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';
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
  selector: 'app-dialog-edit-user',
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
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  public readonly dialog = inject(MatDialogRef);
  firestore: Firestore = inject(Firestore);
  userId: string | null = '';
  user!: User;
  loading: boolean = false;
  birthdate!: number;

  ngOnInit() {
    this.birthdate = this.user.birthDate;
  }
  saveUser() {
    console.log('wir kommen rein');
    if (!this.userId) {
      return;
    }
    console.log('hier auch');

    const docRef = doc(this.firestore, 'users', this.userId);
    updateDoc(docRef, this.user.toJSON())
      .then(() => {
        console.log('Dokument erfolgreich aktualisiert');
        this.dialog.close(DialogEditUserComponent);
      })
      .catch((error) => {
        console.error('Fehler beim aktualisieren', error);
      });
  }
}
