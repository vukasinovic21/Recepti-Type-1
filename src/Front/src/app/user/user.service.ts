import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  //in service we want to provide CRUD operations
  private backUrl = environment.backUrl;
  private allUsers: User[] = [];
  
  constructor(private http: HttpClient){}

  getAllUsers(): Observable<User[]> //implementirati na beku
  {
    return this.http.get<{users: User[]}>(this.backUrl + "/users/")
    .pipe(
      map(response => response.users)
    );
  }

  getUser(id: string): Observable<User> //implementirati na beku
  {
    return this.http.get<{user: User}>(this.backUrl + "/users/id/" + id)
    .pipe(
      map(response => response.user)
    );
  }
}
