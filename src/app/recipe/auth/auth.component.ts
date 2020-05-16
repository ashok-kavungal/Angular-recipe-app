import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponse} from './../auth/auth.service'
import { Observable } from 'rxjs';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    logInMode = false;
    isLoading = false;
    error: String;

    constructor(private authService : AuthService){}

    switchAuthMode(){
        this.logInMode = !this.logInMode;
    }

    onAuthFormSubmit(authForm : NgForm){

        if (authForm.invalid){ return ;}

        const email = authForm.value.email;
        const password = authForm.value.password;
        this.isLoading = true;

        let authObservable : Observable<AuthResponse>; 

        if(this.logInMode){
            authObservable = this.authService.signIn(email,password);
        }else{
            authObservable= this.authService.signUp(email,password)
        }

        authObservable.subscribe(res=>{
            this.isLoading = false;
            console.log(res);
        },defErrorMsg=>{
            this.isLoading = false;
            this.error = defErrorMsg
        });

        authForm.reset();
    }
}