import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateDiet } from '../models/create-diet';
import { Recipe } from '../models/recipe';
import { DietService } from '../diet/diet.service';
import { RecipeService } from '../recipe/recipe.service';

@Component({
  selector: 'app-create-diet',
  templateUrl: './create-diet.component.html',
  styleUrl: './create-diet.component.css'
})
export class CreateDietComponent implements OnInit
{

  recipes: Recipe[] = [];  
  createForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private dietService: DietService, private router: Router){}

  ngOnInit(): void 
  {
    this.recipeService.getAllRecipes().subscribe( recipes => {
      this.recipes = recipes;
    });

    this.createForm = this.formBuilder.group({
      userId: ['f8a9e484-65e9-4b01-94b6-7da073e9f43b'], //promeniti na ulogovanog korisnika!
      dietName: ['', Validators.required],
      nutritionId: ['f8a9e484-65e9-4b01-94b6-7da073e9f43b'], //promeniti na ulogovanog korisnika, nekad na nutricionistu ako ga bude!
      planOfdiets: this.formBuilder.array([this.createItem()])
    });
  }

  get planOfDiets(): FormArray 
  {
    return this.createForm.get('planOfDiets') as FormArray;
  }

  createItem(): FormGroup 
  {
    return this.formBuilder.group({
      recipeId: ['', Validators.required],
      typeOfMealId: [0, [Validators.required, Validators.min(0)]],
      dayOfWeek: [0, [Validators.required, Validators.min(0)]]
    });
  }


  onSubmit()
  {
    /*
    if(this.registerForm.valid)
      {
        let registerUser: User = this.registerForm.value;
        this.authService.register(registerUser)

        this.router.navigate(['/login'])
      }
    }*/
  }
}
