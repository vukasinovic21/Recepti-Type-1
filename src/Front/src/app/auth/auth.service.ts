import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Jwt } from '../models/jwt';
import { Question } from '../models/question';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError, timeout } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from "jwt-decode";
import { UserInfo } from '../models/user-info';
import { ForgotPassword } from '../models/forgot-password';

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

  private user = new BehaviorSubject<UserInfo>({id: '',
                                                name: '',
                                                lastname: '',
                                                username: '',
                                                email: '',
                                                dateOfBirth: new Date(),
                                                role: '',
                                                createdAt: new Date(), 
                                                sex: '',
                                                questionId: ''});
  currentUser = this.user.asObservable();

  private backUrl = environment.backUrl;
  private backUrlJava = environment.backUrlJava;

  constructor(private http: HttpClient){}

  loggedin() 
  {
    this.loggedIn.next(true); 
    const jwt = localStorage.getItem('jwt');
    if(jwt)
    {    
      const decodedToken = jwtDecode<Jwt>(jwt);
      const username = this.getClaimValue(decodedToken, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name');
      this.username.next(username);

      localStorage.setItem('userid', this.getClaimValue(decodedToken, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'));
      const userid = localStorage.getItem("userid");
      if(userid)
      {
        this.getUserInfo(userid).subscribe(user =>
          {
             this.user.next(user);
          }
        );
      }

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
    this.user.next({id: '',
      name: '',
      lastname: '',
      username: '',
      email: '',
      dateOfBirth: new Date(),
      role: '',
      createdAt: new Date(), 
      sex: '',
      questionId: ''});
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
      map(response => response.id),
      catchError(error => {
        //console.log(error)

          if (error.status === 500 && error.error?.detail) 
          {
            const errorMessage = error.error.detail; 
            if (errorMessage === "An user with this email already exists.") 
            {
              return throwError(() => new Error("An user with this email already exists."));
            } 
            else if (errorMessage === "An user with this username already exists.") 
            {
              return throwError(() => new Error("An user with this username already exists."));
            }
          }
          return throwError(() => new Error("An error occured."));
      })
    );
  }

  getAllQuestions(): Observable<Question[]> 
  {
    return this.http.get<{ questions: Question[]}>(this.backUrl + "/questions")
    .pipe(
      map(response => response.questions)
    );
  }

  getSafetyQuestion(email: String): Observable<String>
  {
    return this.http.get<String>(this.backUrlJava + "/users/question/" + email, { responseType: 'text' as 'json' })
    .pipe(
      catchError(this.handleError) // Catch and handle the error here
    );;
  }

  private handleError(error: HttpErrorResponse) 
  {
    if (error.status === 404) 
    {
      return throwError(`User not found for email: ${error.error}`);
    } 
    else 
    {
      return throwError('An error occurred while fetching the safety question.');
    }
  }

  reset(loginUser: ForgotPassword) : Observable<String>
  {
    return this.http.get<String>(this.backUrlJava + "/users/question/", { responseType: 'text' as 'json' });
  }

  delete(id: string): void
  {
    //treba da nadjemo i obrisemo usera
  }

  update(id: string): void
  {
    //treba da promenimo nesto kod usera
  }

  getUserInfo(id: string): Observable<UserInfo> 
  {
    return this.http.get<{user: UserInfo[]}>(this.backUrl + "/users/id/" + id)
    .pipe(
      map(response => response.user[0])
    );
  }
}
