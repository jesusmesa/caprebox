import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  constructor(private http:HttpClient) { }

  getFolders(token:string){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('x-token', token);
    return this.http.get(environment.apiUrl + "/folders",{headers});
  }

  getAllCategories(){
    return this.http.get(environment.apiUrl + "/categories/all");
  }


  createFolder(token,data){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('x-token', token);
    return this.http.post(environment.apiUrl + "/folders",data,{headers});
  }

  updateCategorie(id, data){
    return this.http.put(environment.apiUrl + "/categories/" + id, data);
  }

  deleteCategorie(id){
    return this.http.delete(environment.apiUrl + "/categories/" + id);
  }

}
