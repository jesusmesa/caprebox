import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';
declare var $;
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  
  title:string = "Agregar cliente";

  customers:any;
  customerForm: FormGroup;
  page:number = 0;
  search:string = "";
  constructor(private customersService:CustomersService) { 
    this.customerForm = this.createForm();
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  get id() { return this.customerForm.get('id'); }
  get primer_nombre() { return this.customerForm.get('primer_nombre'); }
  get segundo_nombre() { return this.customerForm.get('segundo_nombre'); }
  get primer_apellido() { return this.customerForm.get('primer_apellido'); }
  get segundo_apellido() { return this.customerForm.get('segundo_apellido'); }
  get direccion() { return this.customerForm.get('direccion'); }
  get genero() { return this.customerForm.get('genero'); }
  get estado_civil() { return this.customerForm.get('estado_civil'); }
  get fecha_nacimiento() { return this.customerForm.get('fecha_nacimiento'); }
  get rfc() { return this.customerForm.get('rfc'); }
  get curp() { return this.customerForm.get('curp'); }
  get correo() { return this.customerForm.get('correo'); }

  createForm() {
    return new FormGroup({
      id: new FormControl(''),
      primer_nombre: new FormControl('', [Validators.required]),
      segundo_nombre: new FormControl(''),
      primer_apellido: new FormControl('', [Validators.required]),
      segundo_apellido: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      estado_civil: new FormControl('', [Validators.required]),
      fecha_nacimiento: new FormControl('', [Validators.required]),
      rfc: new FormControl(''),
      curp: new FormControl('', [Validators.required]),
      correo: new FormControl(''),
    });
  }

  getCustomers(){
    this.customersService.getCustomers(this.page,this.search).subscribe((resp:any) => {      
      if(resp.ok){
        this.customers = resp.data;
      }
      
    });
  }

  onSaveForm(){    
    if(this.customerForm.valid){
      const data = this.customerForm.value;      
      if(data.id === "" || data.id === null){
        this.customersService.createCustomer(data).subscribe((resp:any) => {
          if(resp.ok){
            Swal.fire(resp.message,'','success');
            this.getCustomers();
            this.closeModal();
          }else{
            Swal.fire(resp.message,'','error');
          }
        });
      }else{
        this.customersService.updateCustomer(data,data.id).subscribe((resp:any)=>{
          if(resp.ok){
            Swal.fire(resp.message,'','success');
            this.getCustomers();
            this.closeModal();
          }else{
            Swal.fire(resp.message,'','error');
          }
        });
      }
    }
  }

  searchCustomer(event){
    if(this.search.length > 2 ){
      this.customersService.getCustomers(this.page,this.search).subscribe((resp:any)=>{        
        if(resp.ok){
          this.customers = resp.data;     
        }
      });
    }else{
      this.getCustomers();
    }
    
  }

  enableCustomer(id){

    Swal.fire({
      title: '¿Esta seguro?',
      text: "El cliente se habilitara",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customersService.enableCustomer(id).subscribe((resp:any) => {
          if(resp.ok){
            Swal.fire(resp.message,'','success');
            this.getCustomers();
          }else{
            Swal.fire(resp.message,'','error');
          }
        });
      }
    })

   
  }

  disableCustomer(id){

    Swal.fire({
      title: '¿Esta seguro?',
      text: "El cliente se deshabilitara",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customersService.disableCustomer(id).subscribe((resp:any) => {
          if(resp.ok){
            Swal.fire(resp.message,'','success');
            this.getCustomers();
          }else{
            Swal.fire(resp.message,'','error');
          }
        });
      }
    })
   
  }

  showModal(){
    this.customerForm.reset();
    $('#customersModal').modal('show');
  }

  showModalEdit(customer){
    this.title = "Editar cliente";
    $('#customersModal').modal('show');
    this.id.setValue(customer.id);
    this.primer_nombre.setValue(customer.primer_nombre);
    this.segundo_nombre.setValue(customer.segundo_nombre);
    this.primer_apellido.setValue(customer.primer_apellido);
    this.segundo_apellido.setValue(customer.segundo_apellido);
    this.direccion.setValue(customer.direccion);
    this.genero.setValue(customer.genero);
    this.estado_civil.setValue(customer.estado_civil);
    this.fecha_nacimiento.setValue(customer.fecha_nacimiento.split('T')[0]);
    this.rfc.setValue(customer.rfc);
    this.curp.setValue(customer.curp);
    this.correo.setValue(customer.correo);
  }

  closeModal(){
    this.title = "Agregar cliente";
    this.customerForm.reset();
    $('#customersModal').modal('hide');
  }
}
