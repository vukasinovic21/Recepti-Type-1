import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllDietsComponent } from './all-diets/all-diets.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = 
[
  {
    path:"", component: HomeComponent
  },
  /*{ path: 'recipes', component: AllRecipesComponent,
    children: [
      { path: 'create', component: CreateRecipeComponent }
    ]
  },*/
  {
    path:"recipe/:id", component: RecipeComponent
  },
  {
    path:"allrecipes", component: AllRecipesComponent
  },
  {
    path:"create", component: CreateRecipeComponent
  },
  {
    path:"users", component: AllUsersComponent
  },
  {
    path:"diets", component: AllDietsComponent 
  },
  {
    path:"login", component: LoginComponent
  },
  {
    path:"register", component: RegisterComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
