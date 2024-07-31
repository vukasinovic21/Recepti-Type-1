import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { AllRecipesComponent } from '../all-recipes/all-recipes.component';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { UserRecipeComponent } from '../user-recipe/user-recipe.component'

@NgModule({
  declarations: [
    RecipeComponent,
    AllRecipesComponent,
    CreateRecipeComponent,
    UserRecipeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    FlexModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class RecipeModule { }
