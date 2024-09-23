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
import { AllGuard } from './guards/all-guard';

const routes: Routes = 
[
  {
    path:"", 
    component: AllRecipesComponent,
    canActivate:[AllGuard] //mogu i jedni i drugi
  },
  /*{ path: 'recipes', component: AllRecipesComponent,
    children: [
      { path: 'create', component: CreateRecipeComponent }
    ]
  },*/
  {
    path:"recipes/:id", 
    component: RecipeComponent,
    canActivate:[AllGuard]
  },
  {
    path:"recipes/user/:id", 
    component: UserRecipeComponent,
    canActivate:[AllGuard]
  },
  {
    path:"recipes", component: 
    AllRecipesComponent,
    canActivate:[AllGuard]
  },
  {
    path:"create", 
    component: CreateRecipeComponent,
    canActivate:[IsLoggedGuard] //moze samo ulogovan
  },
  {
    path:"diets/create", 
    component: CreateDietComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:"users", 
    component: AllUsersComponent
  },
  { 
    path: 'diets', 
    component: AllDietsComponent,
    children: 
    [
      { path: ':id', component: DietComponent }
    ],
    canActivate:[IsLoggedGuard]
  },
  {
    path:"login", 
    component: LoginComponent,
    canActivate:[NoLoggedGuard] //moze samo nelogovan 
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
