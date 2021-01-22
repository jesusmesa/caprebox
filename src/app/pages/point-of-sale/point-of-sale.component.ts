import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit {

  fecha:string = "";
  id:number;
  idProduct:number;
  customer:any;
  products:any = [];
  total:number = 0;
  index = 0;
  constructor(private customersService:CustomersService,private productsService:ProductsService) { }

  ngOnInit(): void {
    var date = new Date();
    this.fecha = date.toISOString().split('T')[0];
    
  }

  searchCustomer(){
    this.customersService.getCustomer(this.id).subscribe((resp:any) => {
      if(resp.ok){
        this.customer = resp.data;
      }else{
        this.customer = null;
        Swal.fire(resp.message,'','error');
      }
    });
  }

  searchProduct(){
    this.productsService.getProduct(this.idProduct).subscribe((resp:any) => {
      if(resp.ok){
        let data = resp.data;
        data.index = this.index++;
        data.cantidad = 1;
        this.total += data.precio;
        console.log(data);
        
        this.products.push(data);
        this.idProduct = null;  
      }else{
        Swal.fire(resp.message,'','error');
      }
    });
  }

  deleteProduct(product){
    var i = this.products.indexOf( product );
    console.log(i);
    this.products.splice( i, 1 );
    //this.products.splice(product.index,1);
  }

}
