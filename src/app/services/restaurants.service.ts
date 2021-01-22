import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  restaurant:any;

  constructor(private http:HttpClient) { 
    this.getDeatails();
  }

  getDeatails(){
    return new Promise((resolve,reject) => {
      this.http.get(environment.apiUrl + "/restaurants").subscribe((resp:any) => {
        if(resp.ok){
          resolve(resp);
        }else{
          resolve(resp);
        }
      });
    });
  }

  updateInformation(data,id){
    return this.http.put(environment.apiUrl + "/restaurants/" + id,data);
  }


}
