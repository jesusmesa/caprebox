import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getProductos(page,search){
    return this.http.get(environment.apiUrl + "/products?page=" + page + "&search=" + search);
  }

  getProduct(id:number){
    return this.http.get(environment.apiUrl + "/products/" +id);
  }
  uploadImage(image:File){
    const formData = new FormData();
    formData.append('imagen', image);
    return this.http.post(environment.apiUrl + "/products/upload", formData);
  }

  createProduct(data){
    return this.http.post(environment.apiUrl + "/products",data);
  }
  editProduct(data,id){
    return this.http.put(environment.apiUrl + "/products/" + id,data);
  }

  deleteProduct(id){
    return this.http.delete(environment.apiUrl + "/products/" + id);
  }

}
