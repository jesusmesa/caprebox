import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }

  getCustomers(page:number,search:string){
    return this.http.get(environment.apiUrl + "/customers?page=" + page +"&search=" +search);
  }

  getCustomer(id:number){
    return this.http.get(environment.apiUrl + "/customers/" + id);
  }

  createCustomer(data){
    return this.http.post(environment.apiUrl + "/customers",data);
  }
  
  updateCustomer(data,id){
    return this.http.put(environment.apiUrl + "/customers/" + id,data);
  }

  enableCustomer(id){
    return this.http.put(environment.apiUrl + "/customers/enable/" + id,{estatus:1});
  }

  disableCustomer(id){
    return this.http.put(environment.apiUrl + "/customers/disable/" + id,{estatus:2});
  }

}
