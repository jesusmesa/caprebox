import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {y

  remember:boolean = true;
  username:string;
  constructor(private usersService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.usersService.loadStorage();
    (this.usersService.username != '') ? this.remember = true : this.remember = false; 
    if(this.remember) this.username = this.usersService.username;
  }

  async login(form:NgForm){
  
    if(form.valid){
      const data = form.value;
      console.log(data);
      
      const resp:any = await this.usersService.login(data.user,data.password,data.remember);
      if(resp.ok){
        this.router.navigate(['/dashboard']);
      }else{
        Swal.fire(resp.message,'','error');

      }
    }
    
    
  }

}
