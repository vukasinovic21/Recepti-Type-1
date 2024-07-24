import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { AllRecipesComponent } from '../all-recipes/all-recipes.component';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RecipeComponent,
    AllRecipesComponent,
    CreateRecipeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RecipeModule { }
