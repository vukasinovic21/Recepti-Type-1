import { Component, AfterViewInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Like } from '../models/like';
import { RecipeService } from '../recipe/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeOfFood } from '../models/type-of-food';
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

  allTypesOfFood: TypeOfFood[] = [];
  allUsers: UserInfo[] = [];

  isPaused: boolean = false;

  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private usersService: UserService){}

  ngAfterViewInit(): void 
  {
    window.scrollBy(0, window.innerHeight);
  }

  pauseAnimation() 
  {
    this.isPaused = true;
  }

  resumeAnimation() 
  {
    this.isPaused = false;
  }
  ngOnInit(): void 
  {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });

    this.recipeService.getAllTypesOfMeal().subscribe( types => {
      this.allTypesOfFood = types;
    })

    this.usersService.getAllUsers().subscribe( users => {
      this.allUsers = users;
    })
  }
  showRecipeId(recipeId:string): void
  {
    this.router.navigate(['/recipes/id/' + recipeId]);
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

  getUserRole(id: string): string 
  {
    const userinfo = this.allUsers.find(userinfo => userinfo.id === id);
    return userinfo ? userinfo.role : 'Unknown';
  }


  showUserId(userId:string): void
  {
    this.router.navigate(['/recipes/user/' + userId]);
  }
}
