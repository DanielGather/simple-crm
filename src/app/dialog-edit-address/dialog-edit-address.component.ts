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
import { updateDoc } from 'firebase/firestore';
@Component({
  selector: 'app-dialog-edit-address',
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
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  public readonly dialog = inject(MatDialogRef);
  user!: User;
  userId: string | null = '';
  loading: boolean = false;
  firestore: Firestore = inject(Firestore);

  saveUser() {
    if (!this.userId) {
      return;
    }
    const docRef = doc(this.firestore, 'users', this.userId);
    updateDoc(docRef, this.user.toJSON())
      .then(() => {
        console.log('Dokument erfolgreich aktualisiert');
        this.dialog.close(DialogEditAddressComponent);
      })
      .catch((error) => {
        console.error('Fehler beim aktualisieren', error);
      });
  }
}
