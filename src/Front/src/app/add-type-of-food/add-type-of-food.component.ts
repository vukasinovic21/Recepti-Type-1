import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-add-type-of-food',
  templateUrl: './add-type-of-food.component.html',
  styleUrl: './add-type-of-food.component.css'
})
export class AddTypeOfFoodComponent 
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
