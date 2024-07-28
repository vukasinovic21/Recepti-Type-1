import { Injectable } from '@angular/core';
import { TypeOfFood } from '../models/type-of-food';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeNutritions } from '../models/recipe-nutritions';
import { RecipeItem } from '../models/recipe-item';
import { CreateRecipe } from '../models/create-recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService 
{

  private backUrl = environment.backUrl;
  private allTypesOfFood: TypeOfFood[] = [];
  private allRecipes: Recipe[] = [];

  constructor(private http: HttpClient){}

  getAllTypesOfMeal(): Observable<TypeOfFood[]> 
  {
    return this.http.get<{ typesOfFood: TypeOfFood[]}>(this.backUrl + "/typesoffood")
    .pipe(
      map(response => response.typesOfFood)
    );
  }

  getAllRecipes(): Observable<Recipe[]>
  {
    return this.http.get<{recipes: {data:Recipe[]}}>(this.backUrl + "/recipes")
    .pipe(
      map(response => response.recipes.data)
    );
  }

  getRecipeInfo(id: string): Observable<Recipe[]>
  {
    return this.http.get<{recipes: Recipe[]}>(this.backUrl + "/recipes/id/" + id)
    .pipe(
      map(response => response.recipes)
    )
  }

  getRecipeNutritions(id: string): Observable<RecipeNutritions>
  {
    return this.http.get<{recipeNutritions: RecipeNutritions}>(this.backUrl + "/recipes/id/nut/" + id)
    .pipe(
      map(response => response.recipeNutritions)
    )
  }

  createNewRecipe(recipe: CreateRecipe): Observable<string>
  {
    return this.http.post<{id: string}>(this.backUrl + "/recipes", recipe)
    .pipe(
      map(response => response.id)
    );
  }

}
