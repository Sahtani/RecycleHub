import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {User} from '../../../core/models/user.model';

@Component({
  selector: 'app-edit-profile-pop-up',
  imports: [
    FormsModule
  ],
  templateUrl: './edit-profile-pop-up.component.html',
  standalone: true,
  styleUrl: './edit-profile-pop-up.component.css'
})
export class EditProfilePopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfilePopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }

}
