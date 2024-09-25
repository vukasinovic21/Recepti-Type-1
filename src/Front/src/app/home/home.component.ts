import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Like } from '../models/like';
import { RecipeService } from '../recipe/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { TypeOfFood } from '../models/type-of-food';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AuthService } from '../auth/auth.service';
import { UserInfo } from '../models/user-info';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: []
})
export class HomeComponent implements AfterViewInit
{
  recipes: Recipe[] = [];  
    filteredRecipes: Recipe[] = [];

    selectedTypes: String[] = []; 
    allTypesOfFood: TypeOfFood[] = [];
    allUsers: UserInfo[] = [];

    sortOrder = "";
    recipesPerPage = 8;
    numberOfRecipes = 0;
    currentPage = 1; 

    like: Like = 
    {
      recipeId: '',
      userId: ''
    };  

    constructor(
      private recipeService: RecipeService, 
      private router: Router, 
      private route: ActivatedRoute, 
      private usersService: UserService){}

    ngAfterViewInit(): void 
    {
      window.scrollBy(0, window.innerHeight);
    }

    ngOnInit(): void 
    {
      /*this.recipeService.getAllRecipesPage(this.currentPage-1, this.recipesPerPage).subscribe( recipes => {
          this.recipes = recipes;
          this.filteredRecipes = recipes; 
      });

      this.route.queryParams.subscribe(() => {
        this.recipeService.getAllRecipesPage(this.currentPage-1, this.recipesPerPage).subscribe( recipes => {
          this.recipes = recipes;
          this.filteredRecipes = recipes;
        });
      });*/

      this.recipeService.getAllRecipes().subscribe(recipes => {
        this.recipes = recipes; // all recipes
        this.applyFiltersAndPagination();
      });

      this.recipeService.getAllTypesOfMeal().subscribe( types => {
        this.allTypesOfFood = types;
      })
     
      /*this.recipeService.getAllRecipesCount().subscribe(number =>{
        this.numberOfRecipes = number;
      })*/

      this.usersService.getAllUsers().subscribe( users => {
        this.allUsers = users;
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

    getTypeName(id: string): string 
    {
      const type = this.allTypesOfFood.find(type => type.id === id);
      return type ? type.typeName : 'Unknown';
    }

    getUserSex(id: string): string 
    {
      const userinfo = this.allUsers.find(userinfo => userinfo.id === id);
      return userinfo ? userinfo.sex : 'Unknown';
    }

    showUserId(userId:string): void
    {
      this.router.navigate(['/recipes/user/' + userId]); //svi recepti tog korisnika
      //ili mozda javni profil korisnika kad se prikljucio, koliko recepata, username, genericna slika i svi recepti
    }

    applyFiltersAndPagination(): void 
    {
      let filtered = this.selectedTypes.length > 0 
        ? this.recipes.filter(recipe => this.selectedTypes.includes(recipe.typeOfFoodId)) 
        : this.recipes;

        filtered = this.applySearch(filtered);
        filtered = this.applySort(filtered); 

      this.numberOfRecipes = filtered.length;
      this.filteredRecipes = filtered.slice((this.currentPage - 1) * this.recipesPerPage, this.currentPage * this.recipesPerPage);
    }

    search(event: Event): void //treba da pretrazi sve recepte a ne samo sa trenutne stranice
    {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.applyFiltersAndPagination();  
    }

    applySearch(recipes: Recipe[]): Recipe[] 
    {
      const searchTerm = (document.querySelector('.search input') as HTMLInputElement)?.value.toLowerCase() || '';
      if (searchTerm) {
        return recipes.filter(recipe => recipe.recipeName.toLowerCase().includes(searchTerm));
      }
      return recipes;
    }

    filterTypeOfFood(filterOption: string): void //treba da pretrazi sve recepte a ne samo sa trenutne stranice
    {
      const index = this.selectedTypes.indexOf(filterOption);
      if (index === -1) 
        this.selectedTypes.push(filterOption);
      else 
        this.selectedTypes.splice(index, 1);
      
      this.applyFiltersAndPagination();
    }

    isSelected(option: string): boolean 
    {
      return this.selectedTypes.includes(option);
    }

    likeRecipe(recipeId:string): void
    {
      this.like.recipeId = recipeId;
      let userid = localStorage.getItem("userid"); 
      if(userid)
      {
        this.like.userId = userid; 
      }
        
      //na backu neka stoji da ako je lajkovano moze da dislajkuje samo tj ne moze 2 puta isti korisnik da lajkuje isti recept
      this.recipeService.likeRecipe(this.like).subscribe( str => {
        console.log(str);
      })
    }

    sortRecipes(order: string): void 
    {
      this.sortOrder = order;
      this.applyFiltersAndPagination(); 
    }

    applySort(recipes: Recipe[]): Recipe[]
    {
      //this.sortOrder = sortValue;
      //this.numberOfRecipes = this.filteredRecipes.length;\
      let sortedRecipes = [...recipes];
      
      if(this.sortOrder === "timeLowHigh")
      {
        recipes.sort((a,b) => a.timeToPrepare - b.timeToPrepare)
      }
      else if(this.sortOrder === "timeHighLow")
      {
        recipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
      }
      else if(this.sortOrder === "nameA-Z")
      {
        recipes.sort((a, b) => a.recipeName.localeCompare(b.recipeName));
      }
      else if(this.sortOrder === "nameZ-A")
      {
        recipes.sort((a, b) => b.recipeName.localeCompare(a.recipeName));
      }
      else if(this.sortOrder === "newest")
      {
        recipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      else if(this.sortOrder === "oldest")
      {
        recipes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
      else if(this.sortOrder === "likeLowHigh")
      {
        //implementirati
        //recipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
      }
      else if(this.sortOrder === "likeHighLow")
      {
        //implementirati
        //recipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
      } 
      return recipes;
    }

    perPage(perPage: number)
    {
      this.recipesPerPage = perPage;
      this.recipeService.getAllRecipesPage(this.currentPage-1, perPage).subscribe( recipes => {
        this.recipes = recipes;
        this.filteredRecipes = recipes; 
      });
    }

    get maxPages(): number 
    {
      return Math.ceil(this.numberOfRecipes / this.recipesPerPage);
    }
    goToPage(page: number): void 
    {
      if (page >= 1 && page <= this.maxPages) 
      {
        this.currentPage = page;
        this.applyFiltersAndPagination();
      }
    }
    
    resetPage() 
    {
      this.currentPage = 1;  
      this.applyFiltersAndPagination();
    }
}
