import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(private usersService:UsersService,private router:Router){

  }

  canActivate() {

    if(!this.usersService.isLogged()){
      return true;
    }else{
      this.router.navigate(['/dashboard']);
    }

    
  }
  
}
