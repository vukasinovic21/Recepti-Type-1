import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

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

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit()
  {
    this.checkLogin();
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLogged = loggedIn;
    });
  }

  checkLogin()
  {
    var jwt = localStorage.getItem("jwt");
    if(jwt)
    {
      this.isLogged = true;
    }
  }

  logout() 
  {
    localStorage.removeItem('jwt');
    this.isLogged = false;
    this.authService.loggedout();
    this.router.navigate(['/'])
  }
}
