import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe/recipe.service';
import { TypeOfFood } from '../models/type-of-food';
import { UserInfo } from '../models/user-info';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-random-recipe',
  templateUrl: './random-recipe.component.html',
  styleUrl: './random-recipe.component.css'
})
export class RandomRecipeComponent 
{

  type: string = '';
  ingredients: string[] = [];

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
    this.recipeId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getAllTypes();
    this.getAllUsers();
  }

  getRandom(): void
  {
    this.recipeService.getRandomRecipe().subscribe(recipe => {
      this.recipe = recipe;
      this.recipeId = recipe.id;
      this.router.navigate(['/recipes/random/' + recipe.id])
    });
  }

  getRandomForType(type: string): void //poslati id tipa hrane
  {

  }

  getRecipesByIngredients(ingredients: string[]): void //poslati listu id-jeva sastojaka
  {

  }

  showRecipeId(recipeId:string): void
  {
    this.router.navigate(['/recipes/id/' + recipeId]);
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

  getTypeName(id: string): string 
  {
    const type = this.allTypesOfFood.find(type => type.id === id);
    return type ? type.typeName : 'Unknown';
  }
}
