import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  //in service we want to provide CRUD operations

  private backUrl = environment.backUrl;
  private allQuestions: Question[] = [];
  

  constructor(private http: HttpClient){}

  login(user: User): void
  {
    //treba da pronadjemo usera
  }

  register(user: User): void
  {
    //treba da posaljemo novog usera
  }

  getAllQuestions(): Observable<Question[]> 
  {
    return this.http.get<{ questions: Question[]}>(this.backUrl + "/questions")
    .pipe(
      map(response => response.questions)
    );
  }

  delete(id: string): void
  {
    //treba da nadjemo i obrisemo usera
  }

  update(id: string): void
  {
    //treba da promenimo nesto kod usera
  }
}
