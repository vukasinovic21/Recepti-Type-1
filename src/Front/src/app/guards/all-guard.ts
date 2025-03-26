import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AllGuard implements CanActivate {

  language: string = localStorage.getItem("language") ?? "en";

  constructor(private authService: AuthService, private router: Router, private translate: TranslateService) 
  {
    this.translate.setDefaultLang(this.language);
    this.translate.use(this.language);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      if(localStorage.getItem("jwt"))
      {
        this.authService.loggedin();
        return true
      }
      else
      {
        this.authService.loggedout();
        return true
      }
    }
  
}
