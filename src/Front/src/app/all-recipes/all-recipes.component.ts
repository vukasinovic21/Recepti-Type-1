import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe/recipe.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent 
{

    recipes: Recipe[] = [];  

    constructor(private recipeService: RecipeService, private router: Router){}

    ngOnInit(): void 
    {

      this.recipeService.getAllRecipes().subscribe( recipes => {
          this.recipes = recipes
          console.log(recipes)
      });
    }

    showRecipeId(recipeId:string): void
    {
      this.router.navigate(['/recipe/:' + recipeId])
    }

}
