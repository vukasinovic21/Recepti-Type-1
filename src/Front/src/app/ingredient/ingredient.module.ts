import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientComponent } from './ingredient.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    IngredientComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class IngredientModule { }
