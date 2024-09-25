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
    showAlert = false;

    registerForm: FormGroup = new FormGroup({});

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

    ngOnInit(): void 
    {

      this.authService.getAllQuestions().subscribe( questions => {
          this.questions = questions
      });

      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        passwordHash: ['', [Validators.required, Validators.minLength(8)]], // Validators.pattern['a-zA-Z *'] mozemo da stavimo neki patern za sifru 
        questionId: ['', Validators.required],
        forgotPasswordAnswerHash: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        sex: ['']
      })
    }

    onSubmit()
    {
      if(this.registerForm.valid)
      {
        let registerUser: User = this.registerForm.value;
        this.authService.register(registerUser).subscribe(
          id => {
            this.router.navigate(['/']);
          },
          error => {
            this.showAlert = true;
          }
        );
      }
    }
    closeAlert() 
    {
      this.showAlert = false; 
    }
}
