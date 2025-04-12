import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangeDetectionStrategy, inject, model, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.class';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { collectionData } from '@angular/fire/firestore';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-user',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  allUsers: any[] = [];
  readonly dialog = inject(MatDialog);
  readonly animal = signal('');
  readonly name = model('');
  firestore = inject(Firestore);

  user: User = new User();

  constructor() {}

  ngOnInit() {
    const usersRef = collection(this.firestore, 'users');
    collectionData(usersRef, { idField: 'customId' }).subscribe((users) => {
      console.log('Nutzer:', users);
      this.allUsers = users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
