import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit
{

  resetForm: FormGroup = new FormGroup({});
    showAlert = false;
    showAlert2 = false;
    showAlert3 = false;

    question:String = '';

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

    ngOnInit(): void 
    {
      this.resetForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        //question: ['', [Validators.required]],
        passwordHash: ['', [Validators.required]],
        passwordHash2: ['', [Validators.required]],
      })
    }

    onSubmit()
    {
      if(this.resetForm.valid)
      {
        let loginUser: User = this.resetForm.value;
        if(loginUser.passwordHash != loginUser.passwordHash)
        {
          this.showAlert = false;
          this.showAlert2 = true;
          this.showAlert3 = false;
        }
        else
        {
          this.authService.getSafetyQuestion(loginUser.email).subscribe( 
            (question: String) => 
            {
              this.question = question;
              console.log(this.question);
              //this.authService.loggedin(); // da se izbaci sigurnosno pitanje na koje treba da odgovori korisnik
              this.router.navigate(['/login'])
            },
            (error) => 
            {
              this.showAlert = true;
              this.showAlert2 = false;
              this.showAlert3 = false;
            }
          );
        }
      }
    }
    closeAlert() 
    {
      this.showAlert = false; 
      this.showAlert2 = false; 
      this.showAlert3 = false;
    }
}
