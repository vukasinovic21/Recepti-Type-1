import { Component } from '@angular/core';
import { TypeOfFood } from '../models/type-of-food';
import { RecipeService } from '../recipe/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent 
{

  typesOfFood: TypeOfFood[] = [];  

  constructor(private recipeService: RecipeService, private router: Router){}

  ngOnInit(): void 
    {

      this.recipeService.getAllTypesOfMeal().subscribe( types => {
          this.typesOfFood = types
      });
    }
}
