import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){

    }

    canActivate(){
        //if token is not expired, then allow access else redirect to login page
        if(this.authService.loggedIn() === false){
            return true;
        }
        else{
            this.router.navigate(['/login']);
            return false; 
        }
    }
}
