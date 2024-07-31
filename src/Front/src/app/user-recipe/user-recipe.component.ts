import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Like } from '../models/like';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe/recipe.service';
import { User } from '../models/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrl: './user-recipe.component.css'
})
export class UserRecipeComponent 
{

  recipes: Recipe[] = [];  
  filteredRecipes: Recipe[] = [];
  sortOrder = "";
  user?: User;

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute, private userServise: UserService){}

  ngOnInit(): void 
  {
    let userId = this.activatedRoute.snapshot.paramMap.get('id') ?? "default-value";
    
    //this.getUserInfo(userId);
    this.getRecipeUser(userId);

    this.activatedRoute.queryParams.subscribe(() => {
      this.recipeService.getRecipeUser(userId).subscribe( recipes => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
      });
    });
  }

  getUserInfo(userId:string): void //nije implementirano na beku
  {
    this.userServise.getUser(userId).subscribe( user => {
      if (user) {
        this.user = user;
      }
    });
  }

  getRecipeUser(userId:string): void
  {
    this.recipeService.getRecipeUser(userId).subscribe( recipes => {
      this.recipes = recipes;
      this.filteredRecipes = recipes; 
    });
  }

  showRecipeId(recipeId:string): void
  {
    this.router.navigate(['/recipes/' + recipeId]);
  }

  showTypeOfFoodId(typeOfFoodId:string): void
  {
    this.router.navigate(['/recipes/typeoffood/' + typeOfFoodId]); //svi recepti tog tipa
  }

  search(event: Event): void
  {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();

    this.filteredRecipes = this.recipes.filter(
      recipe => recipe.recipeName.toLowerCase().includes(searchTerm))

    this.sortRecipes(this.sortOrder);  
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

