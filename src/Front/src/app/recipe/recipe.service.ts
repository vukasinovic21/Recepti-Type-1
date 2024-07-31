import { Injectable } from '@angular/core';
import { TypeOfFood } from '../models/type-of-food';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeNutritions } from '../models/recipe-nutritions';
import { RecipeItem } from '../models/recipe-item';
import { CreateRecipe } from '../models/create-recipe';
import { Like } from '../models/like';

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

  getRecipeUser(id: string): Observable<Recipe[]>
  {
    return this.http.get<{recipes: Recipe[]}>(this.backUrl + "/recipes/user/" + id)
    .pipe(
      map(response => response.recipes)
    )
  }


  createNewRecipe(recipe: CreateRecipe): Observable<string>
  {
    const capitalizedValue = recipe.recipeName.charAt(0).toUpperCase() + recipe.recipeName.slice(1);
    recipe.recipeName = capitalizedValue;
    const query = {recipe:recipe};

    return this.http.post<{id: string}>(this.backUrl + "/recipes", query)
    .pipe(
      map(response => response.id)
    );
  }

  likeRecipe(like: Like): Observable<string>
  {
    const query = {like: like};
    return this.http.post<{id: string}>(this.backUrl + "/likes", query)
    .pipe(
      map(response => response.id)
    );
  }

  addPicture() : Observable<string>
  {
    const formData = new FormData(); 
    const file: HTMLInputElement | null = document.getElementById('pictures') as HTMLInputElement;

    if(file.files)
    {
      formData.append('picture', file.files[0]);

      return this.http.post<string>(this.backUrl + "/recipes/picture", formData).pipe(
        catchError(error => {
          console.error('Error uploading picture:', error);
          return of('Error uploading picture'); // Return a user-friendly message or handle error as needed
        })
      );
    } 
    else 
    {
      console.error('No file selected.');
      return of('No file selected.'); // Return a user-friendly message
    }
  }

}
