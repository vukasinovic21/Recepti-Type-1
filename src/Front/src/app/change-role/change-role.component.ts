import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrl: './change-role.component.css'
})
export class ChangeRoleComponent 
{
    constructor(public dialogRef: MatDialogRef<ChangeRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {}
  
    onCancel(): void 
    {
      this.dialogRef.close();
    }
  
    onSave(): void 
    {
      this.dialogRef.close(this.data); 
    }

}
