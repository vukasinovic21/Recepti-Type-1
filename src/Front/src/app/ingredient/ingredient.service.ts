import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class IngredientService 
{

  private backUrl = environment.backUrl;
  private backUrlJava = environment.backUrlJava;

  constructor(private http: HttpClient){}

  getAllIngredients(): Observable<Ingredient[]> 
  {
    return this.http.get<{ ingredients: Ingredient[]}>(this.backUrl + "/ingredients")
    .pipe(
      map(response => response.ingredients)
    );
  }

  getIngredientInfo(id:string): Observable<any> //mora any jer ako se stavi Ingredient onda imam problem sa kCal i Gi zbog velikih slova
  {
    return this.http.get<any>(this.backUrlJava + "/ingredients/id/" + id);
  }  

  addIngredient(ingredient: Ingredient): Observable<boolean>
  {
    return this.http.post<boolean>(this.backUrlJava + "/ingredients/add", ingredient);
  }

  editIngredient(ingredient: Ingredient): Observable<boolean> 
  {
    return this.http.put<boolean>(this.backUrlJava + "/ingredients/edit", ingredient);
  }

  deleteIngredient(id: string): Observable<boolean> 
  {
    const ingredient = {id:id}
    return this.http.delete<boolean>(this.backUrlJava + "/ingredients/delete", { body: ingredient });
  }

}
