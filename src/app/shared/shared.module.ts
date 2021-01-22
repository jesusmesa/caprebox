import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
    declarations: [
       HeaderComponent,
       SidebarComponent,
       FooterComponent,
       NopagefoundComponent
    ],
    imports:[
        RouterModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        NopagefoundComponent
    ] 
})

export class SharedModule{}
