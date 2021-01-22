import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title:string = "Agregar usuario";
  users:any;
  totalRows:number;
  userForm: FormGroup;


  constructor(private usersService:UsersService) { 
    this.userForm = this.createForm();
  }

  get id() { return this.userForm.get('id'); }
  get nombre() { return this.userForm.get('nombre'); }
  get correo() { return this.userForm.get('correo'); }
  get usuario() { return this.userForm.get('usuario'); }
  get password() { return this.userForm.get('password'); }

  createForm() {
    return new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.minLength(5)]),
      usuario: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required]),

    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.usersService.getUsers(0,'').subscribe((resp:any)=>{
      if(resp.ok){
        this.users = resp.data;
        this.totalRows = resp.total;        
      }
    });
  }

  onSaveForm(){
    if(this.userForm.valid){
      const data = this.userForm.value; 
      this.usersService.createUser(data).subscribe((resp:any) => {
        if(resp.ok){
          Swal.fire(resp.message,'','success');
          this.closeModal();
          this.getUsers();
        }else{
          Swal.fire(resp.message,'','error');
        }
      });
    }
    
  }

  abrirModal(){
    this.userForm.reset();
    this.title = "Agregar usuario";
    $('#usersModal').modal('show');
  }

  closeModal(){
    this.userForm.reset();
    this.title = "Agregar usuario";
    $('#usersModal').modal('hide');
  }
}
