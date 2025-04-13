import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators,FormGroup,FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RecaptchaModule , RecaptchaFormsModule} from "ng-recaptcha";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RecaptchaModule,RecaptchaFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  siteKey: string = '6LcTZkUqAAAAAPngPr0k72jiUUzqN8zLfS9c_hUN'

  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', Validators.required], 
    });
  }
  authService=inject(AuthService);
  router=inject(Router);
login(){
  console.log(this.loginForm.value)
  this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!,this.loginForm.value.recaptcha!).subscribe((result:any) =>{
    console.log(result);
    localStorage.setItem("token",result.token);
    localStorage.setItem("user",JSON.stringify(result.user));
    this.router.navigateByUrl("/");
  })
}

onCaptchaResolved(captchaResponse: string|null) {
  this.loginForm.patchValue({
    recaptcha:captchaResponse
  })
}
}
