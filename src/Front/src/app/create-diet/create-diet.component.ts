import { Component, OnInit } from '@angular/core';
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

  response: string = '';
  showAlert = false;

  constructor(private formBuilder: FormBuilder, private recipeService: RecipeService, private dietService: DietService, private router: Router){}

  ngOnInit(): void 
  {

    this.recipeService.getAllRecipes().subscribe( recipes => {
      this.recipes = recipes;
    });

    this.createForm = this.formBuilder.group({
      userId: [localStorage.getItem("userid")], 
      dietName: ['', Validators.required],
      nutritionId: [localStorage.getItem("userid")], // Nekad nutricionista ako ga bude!
      kolicina: [1, [Validators.required, Validators.min(1), Validators.max(7)]], //broj dana dijete od 1 do 7 maks
      planOfDiets: this.formBuilder.array([])
    });

    this.setPlanOfDiets(1);

    this.createForm.get('kolicina')?.valueChanges.subscribe(value => {
      this.setPlanOfDiets(value);
    });
  }

  get planOfDiets(): FormArray 
  {
    return this.createForm.get('planOfDiets') as FormArray;
  }

  setPlanOfDiets(count: number) 
  {
    const items = this.planOfDiets;
    while (items.length !== 0) //dodaje pravi broj dana ali mi se brisu unete vrednosti za prethodne dane ?
    {
      items.removeAt(0);
    }

    const meals = ['01a5ba31-d107-41cc-9902-7da073e9f43b', '02863f22-e6ca-404f-a909-eb685273e786', '03d56869-ec65-86e7-4de2-e004e9167ac8', '04bb129c-76e6-3cd1-db54-b41521ed91bb', '056cb8fd-c9c7-435c-ac00-574c82929c34'];

    for (let day = 1; day <= count; day++) 
    {
      for (let i = 0; i < 5; i++) // 5 obroka dnevno
      {
        items.push(
          this.formBuilder.group({
            recipeId: [''],
            typeOfMealId: [meals[i], Validators.required], 
            dayOfWeek: [day, [Validators.required, Validators.min(1), Validators.max(7)]] 
          })
        );
      }
    }
  }

  onSubmit()
  {
    if(this.createForm.valid)
      {
        const validPlanOfDiets = this.planOfDiets.controls.filter(control => control.get('recipeId')?.value !== '');

        if (validPlanOfDiets.length === 0) 
        {
          this.showAlert = true; 
          return;
        }

        const validPlansFormArray = this.formBuilder.array(validPlanOfDiets.map(control => control.value));
        this.createForm.setControl('planOfDiets', validPlansFormArray);
        
        let diet: CreateDiet = this.createForm.value;
        //console.log(diet);
        this.dietService.createNewDiet(diet).subscribe({ 
          next: (str) => {
            this.response = str;
            this.router.navigate(['/diets/' + this.response])
          }
        })
      }
  }

  closeAlert() 
  {
    this.showAlert = false; 
  }
}
