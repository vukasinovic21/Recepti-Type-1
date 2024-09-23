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
import { CreateDietComponent } from './create-diet/create-diet.component';
import { UserRecipeComponent } from './user-recipe/user-recipe.component';
import { DietComponent } from './diet/diet.component';
import { NoLoggedGuard } from './guards/no-logged.guard';
import { IsLoggedGuard } from './guards/is-logged.guard';

const routes: Routes = 
[
  {
    path:"", component: AllRecipesComponent
  },
  /*{ path: 'recipes', component: AllRecipesComponent,
    children: [
      { path: 'create', component: CreateRecipeComponent }
    ]
  },*/
  {
    path:"recipes/:id", component: RecipeComponent
  },
  {
    path:"recipes/user/:id", component: UserRecipeComponent
  },
  {
    path:"recipes", component: AllRecipesComponent
  },
  {
    path:"create", 
    component: CreateRecipeComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:"diets/create", 
    component: CreateDietComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:"users", component: AllUsersComponent
  },
  { 
    path: 'diets', component: AllDietsComponent,
    children: 
    [
      { path: ':id', component: DietComponent }
    ],
    canActivate:[IsLoggedGuard]
  },
  {
    path:"login", 
    component: LoginComponent,
    canActivate:[NoLoggedGuard]
  },
  {
    path:"register", 
    component: RegisterComponent,
    canActivate:[NoLoggedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
