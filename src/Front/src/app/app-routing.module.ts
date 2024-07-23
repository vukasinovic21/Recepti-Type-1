import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllDietsComponent } from './all-diets/all-diets.component';

const routes: Routes = 
[
  {
    path:"", component: HomeComponent
  },
  {
    path:"recipes", component: AllRecipesComponent 
  },
  {
    path:"users", component: AllUsersComponent
  },
  {
    path:"diets", component: AllDietsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
