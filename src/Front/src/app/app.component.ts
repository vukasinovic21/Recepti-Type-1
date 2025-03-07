import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserInfo } from './models/user-info';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  title = 'Recepti type 1 - Front';
  isMobile: any;

  language: string = localStorage.getItem("language") ?? "en";
  isLogged = false;
  username = '';

  user?: UserInfo;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userService: UserService,
    private translate: TranslateService)
    {
      this.translate.setDefaultLang(this.language);
      this.translate.use(this.language);
    }

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
      this.language = localStorage.getItem("language") ?? "en";
    } 
    else 
    {
      this.username = ''; 
      this.language = "en";
    }
  }

  changeLanguage(event: Event) 
  {
    const selectedLang = (event.target as HTMLSelectElement).value;
    localStorage.setItem("language", selectedLang);
    this.language = selectedLang;
    this.translate.use(selectedLang);  
    //staviti u local storage izabrani jezik kako se ne bi resetovao na refresh
  }

  showUserId()
  {
    if(this.user?.role == "ADMIN")
      //this.router.navigate(['/users/admin/'+localStorage.getItem("userid")]);
      this.router.navigate(['/users/admin']);
    else
      this.router.navigate(['/users/user/'+localStorage.getItem("userid")]);
  }

  logout() 
  {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userid');
    localStorage.removeItem('language');
    this.isLogged = false;
    this.username = '';
    this.authService.loggedout();
    this.router.navigate(['/login'])
  }
}
