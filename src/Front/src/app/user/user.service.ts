import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GetUser } from '../models/get-user';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  //in service we want to provide CRUD operations
  private backUrl = environment.backUrl;
  private allUsers: User[] = [];
  
  constructor(private http: HttpClient){}

  getAllUsers(): Observable<GetUser[]> //implementirati na beku
  {
    return this.http.get<{users: GetUser[]}>(this.backUrl + "/users/")
    .pipe(
      map(response => response.users)
    );
  }

  getUser(id: string): Observable<GetUser> 
  {
    return this.http.get<{user: GetUser[]}>(this.backUrl + "/users/id/" + id)
    .pipe(
      map(response => response.user[0])
    );
  }

}
