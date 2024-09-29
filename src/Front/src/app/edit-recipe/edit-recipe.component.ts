import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent {


  constructor(public dialogRef: MatDialogRef<EditRecipeComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {}

  onCancel(): void 
  {
    this.dialogRef.close();
  }

  onSave(): void 
  {
    this.dialogRef.close(this.data); 
  }
}
