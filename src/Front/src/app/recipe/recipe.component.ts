import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from './recipe.service';
import { Router } from '@angular/router';
import { __param } from 'tslib';
import { ActivatedRoute } from '@angular/router';
import { RecipeNutritions } from '../models/recipe-nutritions';
import { RecipeIngredients } from '../models/recipe-ingredients';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})

export class RecipeComponent 
{

    recipe?: Recipe;  
    recipeNutritions?: RecipeNutritions;
    recipeIngredients: RecipeIngredients[] = [];
    kolicina!: number;

    constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute){}

    ngOnInit(): void 
    {
      let id = this.activatedRoute.snapshot.paramMap.get('id') ?? 'default-value';

      this.getNutritions(id);
      this.getInfo(id);
      this.getIngredients(id);
    }

    getNutritions(recipeId:string): void 
    {
      this.recipeService.getRecipeNutritions(recipeId).subscribe( recipeNutritions => {
        this.recipeNutritions = recipeNutritions;
      });
    }

    getInfo(recipeId:string): void //recipes/id{id}
    {
      this.recipeService.getRecipeInfo(recipeId).subscribe( recipe => {
        this.recipe = recipe[0]
      });
    }

    getIngredients(recipeId:string): void 
    {
      this.recipeService.getRecipeIngredients(recipeId).subscribe( recipeIngredients => {
        this.recipeIngredients = recipeIngredients;
      });
    }

    downloadRecipePdf(recipeId:string): void
    {
      //uraditi da se recept skida kao pdf fajl
    }

}