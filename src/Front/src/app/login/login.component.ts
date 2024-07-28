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

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

    ngOnInit(): void 
    {
      this.loginForm = this.formBuilder.group({
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(8)]],
      })
    }

    onSubmit()
    {
      if(this.loginForm.valid)
      {
        let loginUser: User = this.loginForm.value;
        this.authService.login(loginUser)

        this.router.navigate(['/'])
      }
    }
}