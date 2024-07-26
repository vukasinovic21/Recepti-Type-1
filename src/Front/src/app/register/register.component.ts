import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { Question } from '../models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit
{
  
    questions: Question[] = [];  

    registerForm: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

    ngOnInit(): void 
    {

      this.authService.getAllQuestions().subscribe( questions => {
          this.questions = questions
      });

      this.registerForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Lastname: ['', Validators.required],
        Username: ['', Validators.required],
        Email: ['', Validators.required, Validators.email],
        Password: ['', Validators.required, Validators.minLength(8)], // Validators.pattern['a-zA-Z *'] mozemo da stavimo neki patern za sifru 
        DateOfBirth: ['', Validators.required],
        ForgotPasswordAnswer: ['', Validators.required]
      })
    }

    onSubmit()
    {
      if(this.registerForm.valid)
      {
        let registerUser: User = this.registerForm.value;
        this.authService.register(registerUser)

        this.router.navigate(['/login'])
      }
    }
}
