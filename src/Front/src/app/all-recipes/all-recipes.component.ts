import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Like } from '../models/like';
import { RecipeService } from '../recipe/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { TypeOfFood } from '../models/type-of-food';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css',
  animations: []
})
export class AllRecipesComponent 
{

    recipes: Recipe[] = [];  
    filteredRecipes: Recipe[] = [];

    selectedTypes: String[] = []; //lista za typeoffoodId za filter
    allTypesOfFood: TypeOfFood[] = [];
    
    sortOrder = "";
    like: Like = 
    {
      recipeId: '',
      userId: ''
    };  

    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute){}

    ngOnInit(): void 
    {
      this.recipeService.getAllRecipes().subscribe( recipes => {
          this.recipes = recipes;
          this.filteredRecipes = recipes; 
      });

      this.route.queryParams.subscribe(() => {
        this.recipeService.getAllRecipes().subscribe( recipes => {
          this.recipes = recipes;
          this.filteredRecipes = recipes;
        });
      });

      this.recipeService.getAllTypesOfMeal().subscribe( types => {
        this.allTypesOfFood = types;
      })
    }

    showRecipeId(recipeId:string): void
    {
      this.router.navigate(['/recipes/' + recipeId]);
    }

    showTypeOfFoodId(typeOfFoodId:string): void
    {
      this.router.navigate(['/recipes/typeoffood/' + typeOfFoodId]); //svi recepti tog tipa
    }

    showUserId(userId:string): void
    {
      this.router.navigate(['/recipes/user/' + userId]); //svi recepti tog korisnika
      //ili mozda javni profil korisnika kad se prikljucio, koliko recepata, username, genericna slika i svi recepti
    }

    search(event: Event): void
    {
      let searchTerm = (event.target as HTMLInputElement).value;
      searchTerm = searchTerm.toLowerCase();

      this.filteredRecipes = this.recipes.filter(
        recipe => recipe.recipeName.toLowerCase().includes(searchTerm))

      this.sortRecipes(this.sortOrder);  
    }

    filterTypeOfFood(filterOption: string): void
    {
      const index = this.selectedTypes.indexOf(filterOption);
      if (index === -1) 
        this.selectedTypes.push(filterOption);
      else 
        this.selectedTypes.splice(index, 1);

      if(this.selectedTypes.length > 0) // ako nije prazna lista filtera onda samo te sa liste
      {
        this.filteredRecipes = this.recipes.filter(
          recipe => this.selectedTypes.includes(recipe.typeOfFoodId))
      }
      else //ako je prazna lista onda sve recepte ali sortiranje ostaje ako je bilo izabrano
        this.filteredRecipes = this.recipes;
      
      this.sortRecipes(this.sortOrder);  
    }

    isSelected(option: string): boolean 
    {
      return this.selectedTypes.includes(option);
    }

    likeRecipe(recipeId:string): void
    {
      this.like.recipeId = recipeId;
      this.like.userId = "f8a9e484-65e9-4b01-94b6-7da073e9f43b"; //uzeti iz cookie-ja pravu vrednost kada se uradi 
      //na backu neka stoji da ako je lajkovano moze da dislajkuje samo tj ne moze 2 puta isti korisnik da lajkuje isti recept
      this.recipeService.likeRecipe(this.like).subscribe( str => {
        console.log(str);
      })
    }

    sortRecipes(sortValue: string)
    {
      this.sortOrder = sortValue;

      if(this.sortOrder === "timeLowHigh")
      {
        this.filteredRecipes.sort((a,b) => a.timeToPrepare - b.timeToPrepare)
      }
      else if(this.sortOrder === "timeHighLow")
      {
        this.filteredRecipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
      }
      else if(this.sortOrder === "nameA-Z")
      {
        this.filteredRecipes.sort((a, b) => a.recipeName.localeCompare(b.recipeName));
      }
      else if(this.sortOrder === "nameZ-A")
      {
        this.filteredRecipes.sort((a, b) => b.recipeName.localeCompare(a.recipeName));
      }
      else if(this.sortOrder === "newest")
      {
        this.filteredRecipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      else if(this.sortOrder === "oldest")
      {
        this.filteredRecipes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
      else if(this.sortOrder === "likeLowHigh")
      {
        //implementirati
        //this.filteredRecipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
      }
      else if(this.sortOrder === "likeHighLow")
      {
        //implementirati
        //this.filteredRecipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
      } 
    }

}

