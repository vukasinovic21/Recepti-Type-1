import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  //in service we want to provide CRUD operations

  private allUsers: User[] = [];
  
  getAllUsers(): User[]
  {
    return this.allUsers
  }

  getUser(id: string): User | undefined
  {
    return this.allUsers.find(res => res.id === id)
  }
}
