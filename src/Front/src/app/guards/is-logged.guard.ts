import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      if(localStorage.getItem("jwt"))
      {
        /*this.authService.validate().subscribe({next: (res) => {
          return true;
        }, error: () => {
          this.router.navigate(['login']);
        }})*/
        return true;
      }
      else 
      {
        this.router.navigate(['login']);
        return false
      }
    }
  
}
