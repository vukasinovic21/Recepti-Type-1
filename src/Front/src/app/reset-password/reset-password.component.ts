import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent 
{
  constructor(public dialogRef: MatDialogRef<ResetPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onCancel(): void 
  {
    this.dialogRef.close();
  }

  onSave(): void 
  {
    this.dialogRef.close(this.data); 
  }
}
