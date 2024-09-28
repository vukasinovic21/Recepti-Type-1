import { Injectable } from '@angular/core';
import { TypeOfFood } from '../models/type-of-food';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Recipe } from '../models/recipe';
import { RecipeNutritions } from '../models/recipe-nutritions';
import { RecipeItem } from '../models/recipe-item';
import { CreateRecipe } from '../models/create-recipe';
import { Like } from '../models/like';
import { RecipeIngredients } from '../models/recipe-ingredients';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class RecipeService 
{

  private backUrl = environment.backUrl;

  constructor(private http: HttpClient){}

  getAllTypesOfMeal(): Observable<TypeOfFood[]> 
  {
    return this.http.get<{ typesOfFood: TypeOfFood[]}>(this.backUrl + "/typesoffood")
    .pipe(
      map(response => response.typesOfFood)
    );
  }

  getAllIngredients(): Observable<Ingredient[]> 
  {
    return this.http.get<{ ingredients: Ingredient[]}>(this.backUrl + "/ingredients")
    .pipe(
      map(response => response.ingredients)
    );
  }

  getAllRecipes(): Observable<Recipe[]>
  {
    return this.http.get<{recipes: {data:Recipe[]}}>(this.backUrl + "/recipesPublic?PageSize="+10000)
    .pipe(
      map(response => response.recipes.data)
    );
  }

  getAllRecipesCount():  Observable<number>
  {
    return this.http.get<{recipes: {count:number}}>(this.backUrl + "/recipesPublic")
    .pipe(
      map(response => response.recipes.count)
    );
  }

  getRecipeUserCount(id: string): Observable<number>
  {
    return this.http.get<{recipes: {count:number}}>(this.backUrl + "/recipes/user/" + id)
    .pipe(
      map(response => response.recipes.count)
    )
  }

  getAllRecipesPage(pageNumber:number, perPage: number): Observable<Recipe[]>
  {
    return this.http.get<{recipes: {data:Recipe[]}}>(this.backUrl + "/recipesPublic?PageIndex="+ pageNumber + "&PageSize=" + perPage)
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

  getRecipeIngredients(id: string): Observable<RecipeIngredients[]>
  {
    return this.http.get<{recipeIngredients: RecipeIngredients[]}>(this.backUrl + "/recipes/id/ingredients/" + id)
    .pipe(
      map(response => response.recipeIngredients)
    )
  }


  getRecipeUser(id: string): Observable<Recipe[]>
  {
    return this.http.get<{recipes: Recipe[]}>(this.backUrl + "/recipes/user/" + id)
    .pipe(
      map(response => response.recipes)
    )
  }

  getRecipeUserPublic(id: string): Observable<Recipe[]>
  {
    return this.http.get<{recipes: Recipe[]}>(this.backUrl + "/recipes/user/public/" + id)
    .pipe(
      map(response => response.recipes)
    )
  }


  createNewRecipe(recipe: CreateRecipe): Observable<string>
  {
    const capitalizedValue = recipe.recipeName.charAt(0).toUpperCase() + recipe.recipeName.slice(1);
    recipe.recipeName = capitalizedValue;
    const capitalizedValue2 = recipe.instructions.charAt(0).toUpperCase() + recipe.instructions.slice(1);
    recipe.instructions = capitalizedValue2;
    const query = {recipe:recipe};

    //console.log(query)    

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
      map(response => response.id),
      catchError(error => {
        return throwError(() => new Error('Failed to like the recipe.'));
      })
    );
  }

  isLiked(like: Like): Observable<boolean>
  {
    const query = {like: like};

    return this.http.post<{result: boolean}>(this.backUrl + "/likes/check", query)
    .pipe(
      map(response => response.result)
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
          return of('Error uploading picture'); 
        })
      );
    } 
    else 
    {
      //console.error('No file selected.');
      return of('No file selected.'); 
    }
  }

  delete(id: string) : Observable<boolean>
  {
    return this.http.delete<{isSuccess: boolean}>(this.backUrl + "/recipes/" + id)
    .pipe(
      map(response => response.isSuccess)
    );
  }
}