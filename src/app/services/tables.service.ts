import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  constructor(private http:HttpClient) { }

  getTables(page,search){
    return this.http.get(environment.apiUrl + "/tables" +"?page="+page + "&search=" + search);
  }

  getAllTables(){
    return this.http.get(environment.apiUrl + "/tables/all");
  }

  createTable(data){
    return this.http.post(environment.apiUrl + "/tables",data);

  }

  updateTable(data,id:number){
    return this.http.put(environment.apiUrl + "/tables/" + id,data);

  }

  deleteTable(id){
    return this.http.delete(environment.apiUrl + "/tables/" +id);
  }
}
