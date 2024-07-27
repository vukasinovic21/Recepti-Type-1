import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from './recipe.service';
import { Router } from '@angular/router';
import { __param } from 'tslib';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})

export class RecipeComponent 
{

    recipe: Recipe | undefined;  

    constructor(private recipeService: RecipeService, private router: Router){}

    ngOnInit(): void 
    {

      this.recipeService.getRecipeInfo().subscribe( recipe => {
          this.recipe = recipe
      });
    }

    showRecipeId(recipeId:string): void
    {
      this.router.navigate(['/recipes/:' + recipeId])
    }

    getNutritions(recipeId:string): void //recipes/id/nut{id}
    {

    }

    getInfo(recipeId:string): void //recipes/id{id}
    {

    }

}