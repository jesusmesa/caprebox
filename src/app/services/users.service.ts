import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  token:string;
  user:any;
  username:string;

  constructor(private http:HttpClient) {
    this.loadStorage();    
  }

  getUsers(page:number,search:string){
    return this.http.get(environment.apiUrl + "/users" +"?page="+page + "&search=" + search);

  }

  login(user:string, password:string,remember:boolean){

    (remember) ? localStorage.setItem('username',user) : localStorage.removeItem('username');

    return new Promise((resolve,reject) => {
      const data = {
        user,
        password
      }
      return this.http.post(environment.apiUrl +"/users/login",data).subscribe((resp:any) => {
        if(resp.ok){          
          this.token = resp.token;
          this.user = resp.user;
          this.saveStorage();
          resolve(resp);
        }else{
          resolve(resp);
        }
      });
    });
  }

  createUser(data:any){
    return this.http.post(environment.apiUrl + "/users/create",data);
  }

  saveStorage(){
    localStorage.setItem('token',this.token);
    localStorage.setItem('usuario',JSON.stringify(this.user));
  }

  isLogged(){
    return (this.token.length > 0) ? true : false;
  }

  loadStorage(){
    this.token = localStorage.getItem('token') || '';
    if(localStorage.getItem('usuario') != undefined) this.user = JSON.parse(localStorage.getItem('usuario'));
    this.username = localStorage.getItem('username') || '';
  }

  logout(){
    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }


}
