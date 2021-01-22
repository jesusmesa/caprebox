import { Component, OnInit } from '@angular/core';
import { FoldersService } from 'src/app/services/folders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  folders:any;
  loading:boolean = false;

  constructor(private foldersService:FoldersService,private userService:UsersService) { 

  }

  ngOnInit(): void {
    this.foldersService.getFolders(this.userService.token).subscribe((resp:any) => {
      if(resp.ok){
        this.folders = resp.data;
      }
      
    });
  }

}
