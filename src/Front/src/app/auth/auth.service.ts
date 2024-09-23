import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  //in service we want to provide CRUD operations

  private backUrl = environment.backUrl;

  constructor(private http: HttpClient){}

  login(email:string, passwordHash:string): Observable<string>
  {
    const query ={user:{email,passwordHash}};
    return this.http.post<{jwt: string}>(this.backUrl + "/auth/login", query)
    .pipe(
      map(response => response.jwt)
    );
  }

  register(user: User): Observable<string>
  {
    const capitalizedValue = user.name.charAt(0).toUpperCase() + user.name.slice(1);
    user.name = capitalizedValue;
    const capitalizedValue2 = user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1);
    user.lastname = capitalizedValue2;

    const query = {user:user};

    return this.http.post<{id: string}>(this.backUrl + "/auth/register", query)
    .pipe(
      map(response => response.id)
    );
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
