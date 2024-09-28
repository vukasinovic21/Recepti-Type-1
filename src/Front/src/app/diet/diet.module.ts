import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietComponent } from './diet.component';
import { AllDietsComponent } from '../all-diets/all-diets.component';
import { CreateDietComponent } from '../create-diet/create-diet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from '../app-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DietComponent,
    AllDietsComponent,
    CreateDietComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    AppRoutingModule,
    TranslateModule
  ]
})
export class DietModule { }
