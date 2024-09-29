import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Like } from '../models/like';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe/recipe.service';
import { User } from '../models/user';
import { UserService } from '../user/user.service';
import { GetUser } from '../models/get-user';
import { Observable } from 'rxjs';
import { TypeOfFood } from '../models/type-of-food';
import { UserInfo } from '../models/user-info';
import { MatDialog } from '@angular/material/dialog';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrl: './user-recipe.component.css'
})
export class UserRecipeComponent 
{

  user?: GetUser;
  recipes: Recipe[] = [];  
  filteredRecipes: Recipe[] = [];
  likedRecipes: Recipe[] = [];

  showLiked = false;

  showAlert = false;
  deleteThis = '';

  sortOrder = "";
  recipesPerPage = 8;
  numberOfRecipes = 0;
  currentPage = 1; 
  
  userId: string = '';
  loggedUser = localStorage.getItem("userid");

  allTypesOfFood: TypeOfFood[] = [];
  allUsers: UserInfo[] = [];

  like: Like = 
    {
      recipeId: '',
      userId: ''
    };  
  
  constructor(
    private recipeService: RecipeService,
    private router: Router, 
    protected activatedRoute: ActivatedRoute, 
    private userService: UserService, 
    private dialog: MatDialog){}

  ngOnInit(): void 
  {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') ?? "default-value";
    
    //this.getRecipeUser(this.userId);
    this.getUserInfo(this.userId);

    /*this.activatedRoute.queryParams.subscribe(() => {
      this.recipeService.getRecipeUser(this.userId).subscribe( recipes => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
      });
    });*/

    this.recipeService.getAllTypesOfMeal().subscribe( types => {
      this.allTypesOfFood = types;
    })

    this.recipeService.getRecipeUserCount(this.userId).subscribe(number =>{
      this.numberOfRecipes = number;
    })

    this.userService.getAllUsers().subscribe( users => {
      this.allUsers = users;
    })

    this.recipeService.getRecipesLiked(this.userId).subscribe(recipes => {
      //console.log("LAJKOVANI", recipes)
      this.likedRecipes = recipes;
    })
  }

  switchRecipes(sortValue: string):void
  {
    if(sortValue == 'mine')
      this.showLiked = false;
    else
      this.showLiked = true;
  }

  delete(id: string): void
  {
    this.showAlert = true;
    this.deleteThis = id;
  }

  edit(recipeId: string): void 
  {
    const recipe = this.filteredRecipes.find(r => r.id === recipeId);
    const dialogRef = this.dialog.open(EditRecipeComponent, {
      width: '700px',
      data: { ...recipe } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.recipeService.updateRecipe(result).subscribe( success =>
        {
          if(success)
            this.router.navigate(['/recipes/user/' + this.userId], { queryParams: { refresh: new Date().getTime() } }) //treba da se reloaduje
        }
        );
      }
    });
  }

  closeAlert() 
  {
    this.showAlert = false; 
  }
  closeAlert1() 
  {
    this.showAlert = false; 
    this.recipeService.delete(this.deleteThis).subscribe({
      next: (isDeleted: boolean) => {
        this.getRecipeLoggedUser(this.userId)
    }
    });
  }

  getUserSex(id: string): string 
  {
    const userinfo = this.allUsers.find(userinfo => userinfo.id === id);
    return userinfo ? userinfo.sex : 'Unknown';
  }

  getUserInfo(userId:string): void
  {
    this.userService.getUser(userId).subscribe( user1 => {
      this.user = user1;
      //console.log(this.user)
      const loggedUser = localStorage.getItem("userid");
      if(loggedUser)
      {
        if(loggedUser == userId)
          this.getRecipeLoggedUser(userId);
        else
          this.getRecipeUser(userId);
      }
      else
        this.getRecipeUser(userId);
    });
  }

  getRecipeUser(userId:string): void
  {
    this.recipeService.getRecipeUserPublic(userId).subscribe( recipes => {
      this.recipes = recipes;
      this.filteredRecipes = recipes; 
    });
  }

  getRecipeLoggedUser(userId:string): void
  {
    this.recipeService.getRecipeUser(userId).subscribe( recipes => {
      this.recipes = recipes;
      this.filteredRecipes = recipes; 
    });
  }

  getTypeName(id: string): string 
  {
    const type = this.allTypesOfFood.find(type => type.id === id);
    return type ? type.typeName : 'Unknown';
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

    /*let rec = this.likedRecipes.filter(
      recipe => recipe.recipeName.toLowerCase().includes(searchTerm))

    this.likedRecipes = rec;*/

    this.sortRecipes(this.sortOrder);  
  }

  sortRecipes(sortValue: string)
  {
    this.sortOrder = sortValue;
    this.numberOfRecipes = this.filteredRecipes.length;

    if(this.sortOrder === "timeLowHigh")
    {
      this.filteredRecipes.sort((a,b) => a.timeToPrepare - b.timeToPrepare)
      this.likedRecipes.sort((a,b) => a.timeToPrepare - b.timeToPrepare)
    }
    else if(this.sortOrder === "timeHighLow")
    {
      this.filteredRecipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
      this.likedRecipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
    }
    else if(this.sortOrder === "nameA-Z")
    {
      this.filteredRecipes.sort((a, b) => a.recipeName.localeCompare(b.recipeName));
      this.likedRecipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
    }
    else if(this.sortOrder === "nameZ-A")
    {
      this.filteredRecipes.sort((a, b) => b.recipeName.localeCompare(a.recipeName));
      this.likedRecipes.sort((a,b) => b.timeToPrepare - a.timeToPrepare)
    }
    else if(this.sortOrder === "newest")
    {
      this.filteredRecipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.likedRecipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    else if(this.sortOrder === "oldest")
    {
      this.filteredRecipes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      this.likedRecipes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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

  goToPage(page: number) 
  {
    if (page >= 1 && page <= this.maxPages) 
    {
      this.currentPage = page;
    } 
    else 
    {
      console.log('Invalid page number');
    } // mora da se promeni na getUserRecipesPage
    this.recipeService.getAllRecipesPage(this.currentPage-1, this.recipesPerPage).subscribe( recipes => {
      this.recipes = recipes;
      this.filteredRecipes = recipes; 
    });
  }

  likeRecipe(recipeId:string): void
  {
    this.like.recipeId = recipeId;
    let userid = localStorage.getItem("userid"); 
    if(userid)
    {
      this.like.userId = userid; 
    }
    
    this.recipeService.likeRecipe(this.like).subscribe({
      next: (str) => {
        if(str == '00000000-0000-0000-0000-000000000000')
        {
          console.log("Uspesno ste otpratili recept.");
          this.router.navigate(['recipes/user/'+ this.userId], { queryParams: { refresh: new Date().getTime() }})
        }
      }
    });
  }
}

