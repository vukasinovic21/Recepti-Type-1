import { ChangeDetectorRef, Component } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredientService } from '../ingredient/ingredient.service';

@Component({
  selector: 'app-all-ingredients',
  templateUrl: './all-ingredients.component.html',
  styleUrl: './all-ingredients.component.css'
})
export class AllIngredientsComponent 
{
  ingredients: Ingredient[] = [];  
  filteredIngredients: Ingredient[] = [];
  sortOrder = "";
  selectedIngredientId: string | null = null;

  constructor(private ingredientService: IngredientService, private router: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef){}
  
  ngOnInit(): void 
  {
    this.ingredientService.getAllIngredients().subscribe( ingredients => {
        this.ingredients = ingredients;
    });

    
    this.activatedRoute.queryParams.subscribe(() => {
      this.ingredientService.getAllIngredients().subscribe( ingredients => {
        this.ingredients = ingredients;
        this.filteredIngredients = ingredients;
      });
    });
  }

  showIngredientId(ingredientId:string): void 
  {
    this.selectedIngredientId = ingredientId;
    this.router.navigate(['users/admin/ingredients/' + ingredientId]); 
  }

  search(event: Event): void
  {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredIngredients = this.ingredients.filter(
      ingredient => ingredient.name.toLowerCase().includes(searchTerm))

    this.sortIngredients(this.sortOrder);  
  }

  sortIngredients(sortValue: string)
  {
    this.sortOrder = sortValue;
    if(this.sortOrder === "nameA-Z")
    {
      this.filteredIngredients.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if(this.sortOrder === "nameZ-A")
    {
      this.filteredIngredients.sort((a, b) => b.name.localeCompare(a.name));
    }
    else if(this.sortOrder === "lowSugar")
    {
      this.filteredIngredients.sort((a,b) => a.sugar - b.sugar)
    }
    else if(this.sortOrder === "highSugar")
    {
      this.filteredIngredients.sort((a,b) => b.sugar - a.sugar)
    }
    else if(this.sortOrder === "lowCarbs")
    {
      this.filteredIngredients.sort((a,b) => a.carbs - b.carbs)
    }
    else if(this.sortOrder === "highCarbs")
    {
      this.filteredIngredients.sort((a,b) => b.carbs - a.carbs)
    }
    else if(this.sortOrder === "lowFat")
    {
      this.filteredIngredients.sort((a,b) => a.fat - b.fat)
    }
    else if(this.sortOrder === "highFat")
    {
      this.filteredIngredients.sort((a,b) => b.fat - a.fat)
    }
    else if(this.sortOrder === "lowProtein")
    {
      this.filteredIngredients.sort((a,b) => a.protein - b.protein)
    }
    else if(this.sortOrder === "highProtein")
    {
      this.filteredIngredients.sort((a,b) => b.protein - a.protein)
    }
    else if(this.sortOrder === "lowkCal")
    {
      this.filteredIngredients.sort((a,b) => a.kCal - b.kCal)
    }
    else if(this.sortOrder === "highkCal")
    {
      this.filteredIngredients.sort((a,b) => b.kCal - a.kCal)
    }
    else if(this.sortOrder === "lowGi")
    {
      this.filteredIngredients.sort((a,b) => a.gI - b.gI)
    }
    else if(this.sortOrder === "highGi")
    {
      this.filteredIngredients.sort((a,b) => b.gI - a.gI)
    }
  }

  onIngredientDeleted(ingredientId: string) 
  {
    this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== ingredientId);
    this.filteredIngredients = this.filteredIngredients.filter((ingredient) => ingredient.id !== ingredientId);
    this.cdr.detectChanges();
  }
}
