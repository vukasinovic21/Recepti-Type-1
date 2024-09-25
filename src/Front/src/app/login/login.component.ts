import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit
{
  
    loginForm: FormGroup = new FormGroup({});
    showAlert = false;
    showAlert2 = false;

    jwt: string = '';

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

    ngOnInit(): void 
    {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        passwordHash: ['', [Validators.required]],
      })
    }

    onSubmit()
    {
      if(this.loginForm.valid)
      {
        let loginUser: User = this.loginForm.value;
        this.authService.login(loginUser.email, loginUser.passwordHash).subscribe( jwt =>
        {
          this.jwt = jwt;
          if(this.jwt == "User not found")
          {
            this.showAlert = true;
            this.showAlert2 = false;
          }
          else if(this.jwt == "Bad password")
          {
            this.showAlert = false;
            this.showAlert2 = true;
          }
          else 
          { 
            localStorage.setItem('jwt', this.jwt);
            this.authService.loggedin(); // da se obaveste sve ostale komponente da je ulogovan
            this.router.navigate(['/'])
          }
        });
      }
    }
    closeAlert() 
    {
      this.showAlert = false; 
      this.showAlert2 = false; 
    }
}