import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit
{
  
    loginForm: FormGroup = new FormGroup({});

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
          //this.jwt = jwt
          this.router.navigate(['/'])
        );
      }
    }
}