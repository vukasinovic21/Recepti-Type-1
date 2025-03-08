import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AdminComponent } from '../admin/admin.component';
import { AllUsersComponent } from '../all-users/all-users.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { AddTypeOfFoodComponent } from '../add-type-of-food/add-type-of-food.component';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';



@NgModule({
  declarations: [
    UserComponent,
    AdminComponent,
    AllUsersComponent,
    EditUserComponent,
    ResetPasswordComponent,
    AddQuestionComponent,
    AddTypeOfFoodComponent,
    AddIngredientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule
  ]
})
export class UserModule { }
