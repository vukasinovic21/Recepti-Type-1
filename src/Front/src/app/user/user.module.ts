import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AdminComponent } from '../admin/admin.component';
import { AllUsersComponent } from '../all-users/all-users.component';



@NgModule({
  declarations: [
    UserComponent,
    AdminComponent,
    AllUsersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
