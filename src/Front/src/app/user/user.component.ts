import { Component } from '@angular/core';
import { UserInfo } from '../models/user-info';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent 
{

  user?: UserInfo;
  userId: string = '';
  loggedUser = localStorage.getItem("userid");

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private dialog: MatDialog){}

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
}
