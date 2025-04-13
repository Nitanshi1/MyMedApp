import { Component , inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RecaptchaFormsModule,RecaptchaModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   siteKey: string = '6LdyfEUqAAAAAKrViAN1hlaj59UrkTsSedVm4SjP'
  registerForm!: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
   
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', Validators.required], 
    });
  }

  authService = inject(AuthService)
  router=inject(Router)
  register(){
    let value= this.registerForm.value;
    this.authService.register(value.name!,value.email!,value.password!,value.recaptcha!).subscribe(result =>{
      console.log(result)
      alert("user registered");
      this.router.navigateByUrl('/login');
    })
  
  }
  
onCaptchaResolved(captchaResponse: string|null) {
  this.registerForm.patchValue({
    recaptcha:captchaResponse
  })
}
}
