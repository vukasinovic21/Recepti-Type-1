import { Component, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { IngredientService } from './ingredient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})
export class IngredientComponent 
{

  ingredient?: Ingredient;
  ingredientId: string = '';  

  showAlert = false;
  deleteIngredient: string = '';

  @Output() ingredientDeleted = new EventEmitter<string>(); 

  constructor(private ingredientService: IngredientService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog){}
  
  ngOnInit(): void
  { 
    this.activatedRoute.params.subscribe(params => {
      this.ingredientId = params['id']; 
      this.getIngredientInfo(this.ingredientId);
    });
  }

  getIngredientInfo(ingredientId:string): void
  {
    this.ingredientService.getIngredientInfo(ingredientId).subscribe(ingredient => {
      this.ingredient = ingredient;
      this.ingredient!.kCal = ingredient.kcal;
      this.ingredient!.gI = ingredient.gi;
    });
  }

  editIngredient(): void 
  {
    const dialogRef = this.dialog.open(AddIngredientComponent, {
      width: '500px',
      data: { ... this.ingredient } 
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.ingredientService.editIngredient(result).subscribe( success =>
        {
          if(success)
          { 
            this.getIngredientInfo(this.ingredientId);
            alert("Successfully edited new ingredient! :)");
          } 
          else
            alert("Error while editing new ingredient! :(");
        }
        );
      }
    });
  }

  closeAlert() 
  {
    this.showAlert = false; 
  }
  closeAlert1() 
  {
    this.showAlert = false; 
    this.ingredientService.deleteIngredient(this.deleteIngredient).subscribe({
      next: (isDeleted: boolean) => {
        this.ingredientDeleted.emit(this.deleteIngredient);
        this.router.navigate(['/users/admin/ingredients']) 
    }
    });
  }
  delete(ingredientId: string): void 
  {
    this.showAlert = true;
    this.deleteIngredient = ingredientId;
  }

}
