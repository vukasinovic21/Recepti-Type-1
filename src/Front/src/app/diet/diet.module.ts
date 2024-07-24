import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietComponent } from './diet.component';
import { AllDietsComponent } from '../all-diets/all-diets.component';
import { CreateDietComponent } from '../create-diet/create-diet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DietComponent,
    AllDietsComponent,
    CreateDietComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DietModule { }
