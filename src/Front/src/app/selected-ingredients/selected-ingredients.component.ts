import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, filter } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-selected-ingredients',
  templateUrl: './selected-ingredients.component.html',
  styleUrl: './selected-ingredients.component.css'
})
export class SelectedIngredientsComponent 
{

  ingredients: Ingredient[] = [];

  ingredientInput = new FormControl('');
  ingredientInput2 = new FormControl('');
  selectedIngredients: Ingredient[] = [];
  filteredIngredients: Ingredient[] = [];

  selectedIngredients2: Ingredient[] = [];
  filteredIngredients2: Ingredient[] = [];

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) 
  {
    this.ingredientInput.valueChanges.pipe(
      debounceTime(100),
      map(value => value!.toLowerCase()),
      filter(value => value.length > 0),
      map(query => this.filterIngredients(query))
    ).subscribe(filtered => {
      this.filteredIngredients = filtered;
    });

    this.ingredientInput2.valueChanges.pipe(
      debounceTime(100),
      map(value => value!.toLowerCase()),
      filter(value => value.length > 0),
      map(query => this.filterIngredients(query))
    ).subscribe(filtered => {
      this.filteredIngredients2 = filtered;
    });
  }

  ngOnInit(): void 
  {
    this.recipeService.getAllIngredients().subscribe( ingredients => {
      this.ingredients = ingredients;
    })
  }

  filterIngredients(query: string): Ingredient[] 
  {
    return this.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().startsWith(query)
    );
  }

  addIngredient(ingredient: Ingredient): void 
  {
    if (!this.selectedIngredients.some(item => item.id === ingredient.id)) 
    {
      this.selectedIngredients.push(ingredient);
      this.ingredientInput.setValue(''); 
      this.filteredIngredients = []; 
    }
  }

  removeIngredient(ingredient: Ingredient): void 
  {
    this.selectedIngredients = this.selectedIngredients.filter(item => item.id !== ingredient.id);
  }

  addIngredient2(ingredient: Ingredient): void 
  {
    if (!this.selectedIngredients2.some(item => item.id === ingredient.id)) 
    {
      this.selectedIngredients2.push(ingredient);
      this.ingredientInput2.setValue(''); 
      this.filteredIngredients2 = []; 
    }
  }

  removeIngredient2(ingredient: Ingredient): void 
  {
    this.selectedIngredients2 = this.selectedIngredients2.filter(item => item.id !== ingredient.id);
  }


  onSubmit()
  {
    if (this.selectedIngredients.length === 0 && this.selectedIngredients2.length === 0) 
    {
      console.error('No ingredients selected!');
      return;
    }
    
    this.recipeService.getRecipesByIngredients(this.selectedIngredients).subscribe({ 
      next: (str) => {
        this.recipes = str
        console.log(str)
        //this.router.navigate(['/recipes/id/' + this.response], { queryParams: { refresh: new Date().getTime() } });
      },
      error: (err) => 
      {
        console.error("An error ocurred during getting all recipes by selected ingredients:", err);
      }
    });
  }
}
