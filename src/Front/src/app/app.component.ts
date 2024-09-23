import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserInfo } from './models/user-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  title = 'Recepti type 1 - Front';
  isMobile: any;

  isLogged = false;
  username = '';

  user?: UserInfo;

  constructor(private authService: AuthService, private router: Router, private userService: UserService){}

  ngOnInit()
  {
    this.checkLogin();
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLogged = loggedIn;
      if(this.isLogged)
      {
        this.authService.currentUsername.subscribe((username) => {
          this.username = username; 
        });
        let userid = localStorage.getItem("userid");
        if(userid)
        {
          this.authService.currentUser.subscribe((user) => {
            this.user = user; 
          });
        }
      }
    });
  }

  checkLogin() 
  {
    const jwt = localStorage.getItem("jwt");
    this.isLogged = !!jwt; 
    if (this.isLogged) 
    {
      this.username = localStorage.getItem('username') || ''; 
    } 
    else 
    {
      this.username = ''; 
    }
  }

  showUserId()
  {
    this.router.navigate(['/recipes/user/'+localStorage.getItem("userid")]);
  }

  logout() 
  {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userid');
    this.isLogged = false;
    this.username = '';
    this.authService.loggedout();
    this.router.navigate(['/login'])
  }
}
