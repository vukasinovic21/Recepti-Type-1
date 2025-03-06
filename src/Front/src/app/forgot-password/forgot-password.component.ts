import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { ForgotPassword } from '../models/forgot-password';

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
        question: ['', ],
        passwordHash: ['', [Validators.required, Validators.minLength(8)]],
        passwordHash2: ['', [Validators.required, Validators.minLength(8)]],
      })
    }

    onSubmit()
    {
      if(this.resetForm.valid)
      {
        let loginUser: ForgotPassword = this.resetForm.value;
        if(loginUser.passwordHash != loginUser.passwordHash2)
        {
          this.showAlert = false;
          this.showAlert2 = true;
          this.showAlert3 = false;
        }
        else
        {
          this.showAlert = false;
          this.showAlert2 = false;
          this.authService.getSafetyQuestion(loginUser.email).subscribe( 
            (question: String) => 
            {
              this.question = question;
              if(loginUser.question != '')
              {
                //console.log(loginUser);
                this.authService.reset(loginUser).subscribe(
                  (response: Boolean) =>
                  {
                    //console.log(loginUser);
                    //console.log(response);
                    if(response == true)
                      this.router.navigate(['/login'])
                    else
                      this.showAlert3 = true;
                  }
                ); 
              }
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
