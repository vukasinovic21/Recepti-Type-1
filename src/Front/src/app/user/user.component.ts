import { Component } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ResetPassword } from '../models/reset-password';
import { AddIngredientComponent } from '../add-ingredient/add-ingredient.component';
import { ChangeRoleComponent } from '../change-role/change-role.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent 
{

  user?: UserInfo;
  userId: string = '';
  loggedUser: string = '';
  isAdmin?: UserInfo;

  showAlert = false;
  deleteUser = '';

  newPassword?: ResetPassword;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog){}

  ngOnInit(): void
  {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id') ?? localStorage.getItem('userid') ?? 'default-value';
    this.getUserInfo(this.userId);
    this.getAdminInfo(localStorage.getItem("userid") ?? "");
  }

  getUserInfo(userId:string): void
  {
    this.userService.getUserInfo(userId).subscribe(user => {
      this.user = user;
    });
  }

  getAdminInfo(loggedUser:string): void
  {
    this.userService.getUserInfo(loggedUser).subscribe(admin => {
      this.isAdmin = admin;
    });
  }

  edit(userId: string): void 
  {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: { ...this.user } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.userService.editUser(result).subscribe( success =>
        {
          if(success)
          {
            alert("You have successfully edited your profile.")
            this.userService.getUserInfo(this.userId).subscribe( user => {
              this.user = user;
            });
            this.router.navigate(['/users/user/' + this.userId]) 
          } 
        }
        );
      }
    });
  }

  resetPassword(userId: string): void 
  {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      data: { ...this.newPassword } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        this.newPassword = result;
        this.newPassword!.id = this.userId;
        if(result.passwordHash != result.passwordHash2)
          console.log("NISU ISTE!")
        else
        {
          this.userService.resetPassword(result).subscribe( success =>
          {
            if(success)
            {
              alert("You have successfully changed your password.")
              this.userService.getUserInfo(this.userId).subscribe( user => {
                this.user = user;
              });
              this.router.navigate(['/users/user/' + this.userId]) 
            } 
            else
            {
              alert("Pogresna lozinka");
            }
          }
          );
        }
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
          if(success)
          { 
            alert("Successfully added new ingredient! :)");
          } 
          else
            alert("Error while adding new ingredient! :(");
        }
        );
      }
    });
  }

  changeRole(userId: string): void 
  {
    const dialogRef = this.dialog.open(ChangeRoleComponent, {
      width: '500px',
      data: { id: userId } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {//napraviti changeRole

        this.userService.changeRole(result).subscribe( success =>
        {
          if(success)
          {
            alert("You have successfully changed user's role.")
            this.userService.getUserInfo(this.userId).subscribe( user => {
              this.user = user;
            });
            this.router.navigate(['/users/admin/all/' + this.userId]) 
          } 
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
    this.userService.delete(this.deleteUser).subscribe({
      next: (isDeleted: boolean) => {
        this.router.navigate(['/users/admin/all']) 
    }
    });
  }

  delete(userId: string): void
  {
    this.showAlert = true;
    this.deleteUser = userId;
  }
}
