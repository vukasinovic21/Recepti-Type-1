import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe/recipe.service';
import { TypeOfFood } from '../models/type-of-food';
import { UserInfo } from '../models/user-info';
import { UserService } from '../user/user.service';
import { RecipeNutritions } from '../models/recipe-nutritions';

@Component({
  selector: 'app-random-recipe',
  templateUrl: './random-recipe.component.html',
  styleUrl: './random-recipe.component.css'
})
export class RandomRecipeComponent 
{

  selectedTypeId: string = '';
  ingredients: string[] = [];
  recipeNutritions?: RecipeNutritions;

  allTypesOfFood: TypeOfFood[] = [];
  allUsers: UserInfo[] = [];

  recipe: Recipe | undefined;
  userId: string = '';
  recipeId: string = '';
  loggedUser = localStorage.getItem("userid");

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private usersService: UserService){}

  ngOnInit(): void
  {
    this.userId = localStorage.getItem('userid') ?? 'default-value';
    this.getAllTypes();
    this.getAllUsers();
    
    //this.recipeId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.activatedRoute.params.subscribe(params => {
      const newRecipeId = params['id'];
      if (newRecipeId !== this.recipeId) 
      {
        this.recipeId = newRecipeId;
        this.loadRecipe(newRecipeId); 
      }
    });
  }

  loadRecipe(recipeId: string): void 
  {
    this.recipeService.getRecipeInfo(recipeId).subscribe(recipe => {
      this.recipe = recipe[0];
      this.getNutritions(this.recipe.id);
    });
  }
  
  getRandom(): void
  {
    this.recipeService.getRandomRecipe().subscribe(recipe => {
      this.recipe = recipe;
      this.recipeId = recipe.id;
      this.getNutritions(recipe.id);
      this.router.navigate(['/recipes/random/' + recipe.id], { queryParams: { refresh: new Date().getTime() }, replaceUrl: true })
    });
  }

  getRandomForType(type: string): void //poslati id tipa hrane
  {
    this.recipeService.getRandomRecipeForType(type).subscribe(recipe => {
      if(recipe)
      {
        this.recipe = recipe;
        this.recipeId = recipe.id;
        this.getNutritions(recipe.id);
        this.router.navigate(['/recipes/random/' + recipe.id])
      }
      else
      {
        this.recipeNutritions = undefined;
        this.recipe = undefined;
        this.recipeId = '';
        alert("There is no recipes with this type unfortunately :(")
      }
    });
  }

  getRecipesByIngredients(ingredients: string[]): void //poslati listu id-jeva sastojaka
  {
    this.router.navigate(['/recipes/random/ingredients'])
  }

  showRecipeId(recipeId: string, event?: MouseEvent): void 
  {
    const url = this.router.serializeUrl(this.router.createUrlTree(['recipes/id/', recipeId]));
  
    if (event && (event.ctrlKey || event.metaKey || event.button === 1)) 
    {
      window.open(url, '_blank');
    } 
    else
    {
      this.router.navigate(['recipes/id/', recipeId]);
    }
  }

  getUserSex(id: string): string 
  {
    const userinfo = this.allUsers.find(userinfo => userinfo.id === id);
    return userinfo ? userinfo.sex : 'Unknown';
  }

  getUserRole(id: string): string 
  {
    const userinfo = this.allUsers.find(userinfo => userinfo.id === id);
    return userinfo ? userinfo.role : 'Unknown';
  }
  
  getAllTypes(): void
  { 
    this.recipeService.getAllTypesOfMeal().subscribe( types => {
      this.allTypesOfFood = types;
    })
  }

  getAllUsers(): void
  { 
    this.usersService.getAllUsers().subscribe( users => {
      this.allUsers = users;
    })
  }

  getNutritions(recipeId:string): void 
  {
    this.recipeService.getRecipeNutritions(recipeId).subscribe( recipeNutritions => {
      this.recipeNutritions = recipeNutritions;
    });
  }

  getTypeName(id: string): string 
  {
    const type = this.allTypesOfFood.find(type => type.id === id);
    return type ? type.typeName : 'Unknown';
  }
}
