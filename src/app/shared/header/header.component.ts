import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
declare var $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any;
  
  constructor(private usersService:UsersService,private router:Router) { }

  ngOnInit(): void {

    if(screen.width < 600) $(".sidebar").toggleClass("toggled");
    
    
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });

    this.user = this.usersService.user;    
  }

  logout(){
    this.usersService.logout();
    this.router.navigate(['/login']);
  }
}
