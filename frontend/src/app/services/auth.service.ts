import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  http = inject(HttpClient);

  register(name:string,email:string,password:string,recaptcha:string){
    return this.http.post(environment.apiUrl+"/auth/register", {
    name,
    email,
    password,recaptcha
    });
  }

  
  login(email:string,password:string,recaptcha:string){
    return this.http.post(environment.apiUrl+"/auth/login", {
    
    email,
    password,
    recaptcha
    });
  }

 get isLoggedIn(){
  let token = localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;

 }
 get isAdmin(){
  let userData = localStorage.getItem('user');
    if(userData){
      return JSON.parse(userData).isAdmin;
    }
    return false;

 }
  get userName(){
    let userData = localStorage.getItem('user');
    if(userData){
      return JSON.parse(userData).name;
    }
    return null;

  }
  get userEmail(){
    let userData = localStorage.getItem('user');
    if(userData){
      return JSON.parse(userData).email;
    }
    return null;

  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
