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

  showAlert = false;

  onCancel(): void 
  {
    this.dialogRef.close();
  }

  onSave(): void 
  {
    if(this.data.passwordHash != this.data.passwordHash2)
      this.showAlert = true;
    else
      this.dialogRef.close(this.data); 
  }
}
