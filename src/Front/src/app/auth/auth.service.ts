import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Jwt } from '../models/jwt';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, timeout } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  //in service we want to provide CRUD operations

  private loggedIn = new BehaviorSubject<boolean>(true);
  isLoggedIn = this.loggedIn.asObservable();

  private username = new BehaviorSubject<string>('');
  currentUsername = this.username.asObservable();

  private backUrl = environment.backUrl;

  constructor(private http: HttpClient){}

  loggedin() 
  {
    this.loggedIn.next(true); 
    const jwt = localStorage.getItem('jwt');
    if(jwt)
    {
      /*const claimMapping: { [key: string]: string } = 
      {
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "Role",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": "Email",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "Name",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname": "Surname"
      };*/
      
      const decodedToken = jwtDecode<Jwt>(jwt);
      const username = this.getClaimValue(decodedToken, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');
      this.username.next(username);
    }
  }

  getClaimValue(decodedToken: any, claimUri: string): string 
  {
    return decodedToken[claimUri];
  }

  loggedout() 
  {
    this.loggedIn.next(false); 
    this.username.next("");
  }

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
