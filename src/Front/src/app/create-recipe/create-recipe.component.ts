import { Component, OnInit } from '@angular/core';
import { TypeOfFood } from '../models/type-of-food';
import { RecipeService } from '../recipe/recipe.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateRecipe } from '../models/create-recipe';
import { RecipeItem } from '../models/recipe-item';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent implements OnInit
{

  typesOfFood: TypeOfFood[] = [];  
  createForm: FormGroup = new FormGroup({});

  response: string = '';

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private router: Router){}

  ngOnInit(): void 
  {

    this.recipeService.getAllTypesOfMeal().subscribe( types => {
        this.typesOfFood = types
    });

    this.createForm = this.formBuilder.group({
      userId: ['f8a9e484-65e9-4b01-94b6-7da073e9f43b'],
      recipeName: ['', Validators.required],
      typeOfFoodId: ['', Validators.required],
      instructions: ['', Validators.required],
      timeToPrepare: ['', Validators.required],
      picture: ['slikaRecepta'],
      shared: [true],
      recipeItems: this.formBuilder.array([this.createItem(), this.createItem(), this.createItem()])
    });

  }
  get recipeItems(): FormArray 
  {
    return this.createForm.get('recipeItems') as FormArray;
  }

  createItem(): FormGroup 
  {
    return this.formBuilder.group({
      ingredientId: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit()
  {
    if(this.createForm.valid)
    {
      let recipe: CreateRecipe = this.createForm.value;
      this.recipeService.createNewRecipe(recipe).subscribe( str => {
        this.response = str
        console.log(this.response);
      })
      
      this.router.navigate(['/recipes'])
    }
  }
}
