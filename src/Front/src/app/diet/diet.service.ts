import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Diet } from '../models/diet';
import { Observable, map } from 'rxjs';
import { CreateDiet } from '../models/create-diet';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  private backUrl = environment.backUrl;
  
  constructor(private http: HttpClient){}

  getAllDietsUser(userId: string | null): Observable<Diet[]> //treba da se dovrsi
  {
    return this.http.get<{diets:Diet[]}>(this.backUrl + "/diets/user/" + userId)
    .pipe(
      map(response => response.diets)
    );
  }

  getDietById(dietId: string): Observable<Diet[]>
  {
    return this.http.get<{diets:Diet[]}>(this.backUrl + "/diets/id/" + dietId)
    .pipe(
      map(response => response.diets)
    );
  }

  createNewDiet(diet: CreateDiet): Observable<string>
  {
    const capitalizedValue = diet.dietName.charAt(0).toUpperCase() + diet.dietName.slice(1);
    diet.dietName = capitalizedValue;
    const query = {diet:diet};

    return this.http.post<{id: string}>(this.backUrl + "/diets", query)
    .pipe(
      map(response => response.id)
    );
  }

}
