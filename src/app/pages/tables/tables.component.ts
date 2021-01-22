import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TablesService } from 'src/app/services/tables.service';
import Swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  title:string = "Agregar mesa"
  tables:any;
  search:string = "";
  page:number = 0;
  totalRows:number;
  tablesForm: FormGroup;

  loading:boolean = false;

  constructor(private tablesService:TablesService) { 
    this.tablesForm = this.createForm();
  }


  get id() { return this.tablesForm.get('id'); }
  get nombre() { return this.tablesForm.get('nombre'); }
  get descripcion() { return this.tablesForm.get('descripcion'); }

  createForm() {
    return new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  ngOnInit(): void {
    this.getTables();
  }

  getTables(){
    this.tablesService.getTables(0,'').subscribe((resp:any) => {
      if(resp.ok){
        this.tables = resp.data;
        this.totalRows = resp.total;
      }
      
    });
  }

  searchTable(event){
    if(this.search.length > 0 ){
      this.tablesService.getTables(this.page,this.search).subscribe((resp:any)=>{        
        if(resp.ok){
          this.tables = resp.data;     
        }
      });
    }else{
      this.getTables();
    }
  }

  onSaveForm(){
    this.loading = true
    const data = this.tablesForm.value;
    data.estatus = 1;
    if(data.id != null){
      this.tablesService.updateTable(data,data.id).subscribe((resp:any) =>{
        if(resp.ok){
          Swal.fire(resp.message,'','success');
          this.getTables();
          this.closeModal();
          this.loading = false;
        }else{
          Swal.fire(resp.message,'','error');
          this.loading = false;
        }
      });
    }else{
      this.tablesService.createTable(data).subscribe((resp:any) =>{
        if(resp.ok){
          Swal.fire(resp.message,'','success');
          this.getTables();
          this.closeModal();
          this.loading = false;
        }else{
          Swal.fire(resp.message,'','error');
          this.loading = false;
        }
      });
    }
    
  }

  deleteTable(data){
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No se podra recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tablesService.deleteTable(data.id).subscribe((resp:any)=>{          
          if(resp.ok){
            Swal.fire(
              resp.message,
              '',
              'success'
            )
            this.getTables();

          }else{
            Swal.fire(
              resp.message,
              '',
              'error'
            )
          }
        });
      }
    })
  }

  openModal(){
    this.title = "Agregar mesa";
    this.tablesForm.reset();
    $('#tablesModal').modal('show');
  }

  openModalEdit(table){
    this.title = "Editar mesa";
    this.tablesForm.get('id').setValue(table.id);
    this.tablesForm.get('nombre').setValue(table.nombre);
    this.tablesForm.get('descripcion').setValue(table.descripcion);
    $('#tablesModal').modal('show');

  }

  closeModal(){
    this.title = "Agregar mesa";
    this.tablesForm.reset();
    $('#tablesModal').modal('hide');
  }

}
