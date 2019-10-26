import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service'

import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  events =new EventEmitter();

  constructor(private http: HttpServiceService, private snackBar: MatSnackBar, private router: Router) { }

  logIn(data): any {
    let obs = this.http.post('user/login', data);
    obs.subscribe((response: any) => {
      //Save the token (user id which is unique)
        console.log(response);
        localStorage.setItem('fName',response.firstName);
        localStorage.setItem('lName',response.lastName);
        localStorage.setItem('email',response.email);
      sessionStorage.setItem('token',response.id);
      sessionStorage.setItem('fName',response.firstName);
        sessionStorage.setItem('lName',response.lastName);
        sessionStorage.setItem('email',response.email);
      localStorage.setItem('token',response.id);
      let obs1 = this.http.get1('user/'+response.userId);
      obs1.subscribe((res: any)=>{
        console.log(res.service)
        if(res.service=='advance'){
        localStorage.setItem('service',res.service);
        sessionStorage.setItem('service',res.service);
        this.events.emit('advance-service')
      }
      if(res.service=='basic'){
        localStorage.setItem('service',res.service);
        sessionStorage.setItem('service',res.service);
        this.events.emit('basic-service')
      }
      })

    
     
      
      
      this.router.navigateByUrl("/dashboard");
    }, (error) => {
      this.snackBar.open("Invalid LogIn Credentials");
    });
  }

  signUp(data): void {
    let obs = this.http.post('user/userSignUp', data);
    obs.subscribe((response) => {
      if (response["data"].success) {
        this.router.navigateByUrl("/login");
      }
    });
  }

  forgotPassword(data): void {
    let obs = this.http.post('user/reset', data);
    obs.subscribe((response) => this.snackBar.open("Check Mail Inbox"));
  }

  resetPassword(data, token): void {
    let obs = this.http.postWithToken('user/reset-password', data, token);
    obs.subscribe((response) => this.snackBar.open("Password Changed"));
  }
}
