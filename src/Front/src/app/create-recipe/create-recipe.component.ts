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

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private router: Router){}

  /*
  numFields: number = 0; 
  get ingredients() 
  {
    return this.createForm.get('ingredients') as FormArray;
  }*/

  ngOnInit(): void 
  {

    this.recipeService.getAllTypesOfMeal().subscribe( types => {
        this.typesOfFood = types
    });

    this.createForm = this.formBuilder.group({
      userId: ['f8a9e484-65e9-4b01-94b6-7da073e9f43b'],
      recipeName: ['', Validators.required],
      typeOfFood: ['', Validators.required],
      instructions: ['', Validators.required],
      timeToPrepare: ['', Validators.required],
      picture: ['slikaRecepta'],
      shared: [''],
      //recipeItems: this.formBuilder.array([this.createItem()])

      /*ingredientName: [''],
      numFields: [0],
      ingredients: this.formBuilder.array([])  // FormArray for dynamic fields*/
    });

    /*this.createForm.get('numFields')?.valueChanges.subscribe(value => {
      this.updateFields(value);
    });*/
  }

  /*updateFields(count: number) 
  {
    const ingredientsArray = this.ingredients;
    
    // Clear existing fields
    while (ingredientsArray.length) {
      ingredientsArray.removeAt(0);
    }

    // Add new fields
    for (let i = 0; i < count; i++) {
      ingredientsArray.push(this.formBuilder.control(''));
    }
  }*/

  onSubmit()
  {
    if(this.createForm.valid)
    {
      let recipe: CreateRecipe = this.createForm.value;
      console.log(recipe);
      //this.recipeService.createNewRecipe(recipe)
      
      //this.router.navigate(['/recipes'])
    }
  }
}
