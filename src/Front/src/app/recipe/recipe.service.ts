import { Injectable } from '@angular/core';
import { TypeOfFood } from '../models/type-of-food';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

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

  getRecipeInfo(id: string): Observable<Recipe>
  {
    return this.http.get<{recipes: Recipe}>(this.backUrl + "/recipes/" + id)
    .pipe(
      map(response => response.recipes)
    )
  }

  getRecipeNutritiens(id: string): Observable<Recipe>
  {
    return this.http.get<{recipes: Recipe}>(this.backUrl + "/recipes/nut/" + id)
    .pipe(
      map(response => response.recipes)
    )
  }

}
