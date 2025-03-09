import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { GetUser } from '../models/get-user';
import { UserInfo } from '../models/user-info';
import { ResetPassword } from '../models/reset-password';
import { Ingredient } from '../models/ingredient';
import { GeneralInfo } from '../models/general-info';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  //in service we want to provide CRUD operations
  private backUrl = environment.backUrl;
  private backUrlJava = environment.backUrlJava;

  private allUsers: User[] = [];
  
  constructor(private http: HttpClient){}

  getAllUsers(): Observable<UserInfo[]> 
  {
    return this.http.get<{users: UserInfo[]}>(this.backUrl + "/users/")
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

  getUserInfo(id: string): Observable<UserInfo> 
  {
    return this.http.get<{user: UserInfo[]}>(this.backUrl + "/users/id/" + id)
    .pipe(
      map(response => response.user[0])
    );
  }

  getGeneralInfo(): Observable<GeneralInfo>
  {
    return this.http.get<GeneralInfo>(this.backUrlJava + "/users/generalinfo");
  }

  editUser(user: any): Observable<boolean>
  {
    //const query = {user:user};
    const userForBackend = {...user, lastname: user.lastName, };
    return this.http.put<boolean>(this.backUrlJava + "/users/infoupdate", userForBackend);
  }

  resetPassword(resetPassword: ResetPassword): Observable<boolean>
  {
    return this.http.put<boolean>(this.backUrlJava + "/users/resetpassword", resetPassword);
  }

  addQuestion(name: String): Observable<boolean>
  {
    const question = {name:name}
    return this.http.post<boolean>(this.backUrlJava + "/questions/add", question);
  }

  addTypeOfFood(name: String): Observable<boolean>
  {
    const type = {name:name}
    return this.http.post<boolean>(this.backUrlJava + "/typeoffood/add", type);
  }

  addIngredient(ingredient: Ingredient): Observable<boolean>
  {
    return this.http.post<boolean>(this.backUrlJava + "/ingredients/add", ingredient);
  }

  changeRole(user: any): Observable<boolean>
  {
    return this.http.put<boolean>(this.backUrlJava + "/users/changerole", user);
  }

  delete(id: String): Observable<boolean>
  {
    const user = {id:id}
    return this.http.delete<boolean>(this.backUrlJava + "users/delete", { body: user });
  }

}
