import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent 
{
  constructor(public dialogRef: MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onCancel(): void 
  {
    this.dialogRef.close();
  }

  onSave(): void 
  {
    //console.log(this.data)
    this.dialogRef.close(this.data); 
  }
}
