import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPassword } from '../models/reset-password';
import { UserInfo } from '../models/user-info';
import { UserService } from '../user/user.service';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { AddTypeOfFoodComponent } from '../add-type-of-food/add-type-of-food.component';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent 
{

  user?: UserInfo;
  userId: string = '';
  loggedUser = localStorage.getItem("userid");
  newPassword?: ResetPassword;//treba newQuestion, newTypeOfMeal, newIngredient da se ubaci i posebne komponente za sve ili moze jedna sa id-jem i imenom ???

  activeSince: Date = new Date(2024, 3, 4); //same as admins birthday
  activeFor?: number; 

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog)
  {
    this.calculateActiveFor();
  }

  ngOnInit(): void
  {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') ?? localStorage.getItem('userid') ?? 'default-value';
    this.getUserInfo(this.userId);
  }

  getUserInfo(userId:string): void
  {
    this.userService.getUserInfo(userId).subscribe(user => {
      this.user = user;
    });
  }

  calculateActiveFor(): void
  {
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - this.activeSince.getTime();
    this.activeFor = Math.floor(timeDifference / (1000 * 3600 * 24));
  }

  addQuestion(): void 
  {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '400px',
      data: {  } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.userService.addQuestion(result.name).subscribe( success =>
        {
          /*if(success)
          { //is it even neccessery ? //ovde ce morati opet da se pozove funkcija koja vraca broj kategorija
            this.userService.getUserInfo(this.userId).subscribe( user => {
              this.user = user;
            });
            this.router.navigate(['/users/admin']) 
          } */
        }
        );
      }
    });
  }

  addTypeOfFood(): void 
  {
    const dialogRef = this.dialog.open(AddTypeOfFoodComponent, {
      width: '400px',
      data: {  } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.userService.addTypeOfFood(result).subscribe( success =>
        {
          /*if(success)
          { //is it even neccessery ? //ovde ce morati opet da se pozove funkcija koja vraca broj kategorija
            this.userService.getUserInfo(this.userId).subscribe( user => {
              this.user = user;
            });
            this.router.navigate(['/users/admin']) 
          } */
        }
        );
      }
    });
  }


  addIngredient(): void 
  {
    const dialogRef = this.dialog.open(AddIngredientComponent, {
      width: '500px',
      data: {  } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        console.log(result)
        this.userService.addIngredient(result).subscribe( success =>
        {
          /*if(success)
          { //is it even neccessery ? //ovde ce morati opet da se pozove funkcija koja vraca broj kategorija
            this.userService.getUserInfo(this.userId).subscribe( user => {
              this.user = user;
            });
            this.router.navigate(['/users/admin']) 
          } */
        }
        );
      }
    });
  }
}
