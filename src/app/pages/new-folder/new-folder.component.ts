import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FoldersService } from 'src/app/services/folders.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css']
})
export class NewFolderComponent implements OnInit {

  folderForm: FormGroup;
  constructor(private foldersService:FoldersService,private usersService:UsersService,private router:Router) { 
    this.folderForm = this.createForm();
  }

  ngOnInit(): void {

  }

  get id() { return this.folderForm.get('id'); }
  get name() { return this.folderForm.get('name'); }
  get description() { return this.folderForm.get('description'); }

  createForm() {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  onSaveForm(){
    if(this.folderForm.valid){
      const data = this.folderForm.value;
      console.log(data);
      this.foldersService.createFolder(this.usersService.token,data).subscribe((resp:any) => {
        if(resp.ok){
          Swal.fire(resp.message,'','success');
          this.router.navigate(['/dashboard']);

        }else{
          Swal.fire(resp.message,'','error');
        }
        
      });
      
    }
  }
}
