import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, docData } from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  constructor(private route: ActivatedRoute) {}
  userId: string | null = '';
  user: User = new User();
  firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      console.log(this.route.paramMap);
      console.log('GOT ID', this.userId);
      this.getUser();
    });
  }

  getUser() {
    if (!this.userId) {
      return;
    }
    const userDocRef = doc(this.firestore, 'users', this.userId);
    const userData$ = docData(userDocRef);
    userData$.subscribe((data) => {
      console.log('User data:', data);
      this.user = new User(data);
    });
  }

  openDialogAddress(): void {
    const dialogRef = this.dialog.open(DialogEditAddressComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
