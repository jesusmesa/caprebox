import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';

//Pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routing';
import { ProgressComponent } from './progress/progress.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { TablesComponent } from './tables/tables.component';
import { OrdersComponent } from './orders/orders.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { CustomersComponent } from './customers/customers.component';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        UsersComponent,
        TablesComponent,
        OrdersComponent,
        RestaurantsComponent,
        NewFolderComponent,
        CustomersComponent,
        PointOfSaleComponent,
        
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        UsersComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        PAGES_ROUTES,
    ]
})

export class PagesModule{}
