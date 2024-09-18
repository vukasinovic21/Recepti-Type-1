import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('file') file: ElementRef | undefined;
  imageUrl!: File;

  response: string = '';
  kolicina!: number;

  sastojci!: string;
  kolicinaSastojaka!: number;

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
      picture: ['defaultRecipe.jpg'], //ako se ne ubaci slika da se uzme defaultRecipe slika iz baze
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

  onChange(event:any) : void 
  { 
    this.imageUrl = <File>event.target.files[0];
    this.createForm.get('picture')?.setValue(this.imageUrl.name); 
    //dodeliti picture-u iz createForma pravu vrednost ako se ne doda slika dodace se default slika
  } 

  onSubmit()
  {
    if(this.createForm.valid)
    {
      let recipe: CreateRecipe = this.createForm.value;
      this.recipeService.createNewRecipe(recipe).subscribe({ 
        next: (str) => {
          this.response = str

          if(this.createForm.get('picture')?.value != 'defaultRecipe.jpg')
            this.recipeService.addPicture().subscribe();

          this.router.navigate(['/recipes'], { queryParams: { refresh: new Date().getTime() } })
      },
      error: (err) => 
      {
        console.error("An error ocurred during creating new Recipe:", err);
      }
    });
    }
  }
}
