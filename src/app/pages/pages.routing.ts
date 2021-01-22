import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from '../services/guards/auth.guard';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { OrdersComponent } from './orders/orders.component';
import { PagesComponent } from './pages.component';
import { PointOfSaleComponent } from './point-of-sale/point-of-sale.component';
import { ProgressComponent } from './progress/progress.component';
import { TablesComponent } from './tables/tables.component';
import { UsersComponent } from './users/users.component';



const pagesRoutes:Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'progress',
                component: ProgressComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'tables',
                component: TablesComponent
            },
            {
                path: 'new-folder',
                component: NewFolderComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
            },
            {
                path: 'customers',
                component: CustomersComponent
            },
            {
                path: 'point-of-sale',
                component: PointOfSaleComponent
            },
            {
                path: '',
                redirectTo : '/point-of-sale',
                pathMatch : 'full'
            },
            
            {
                path: '**',
                component: NopagefoundComponent
            }
        ]
    },
];


export const PAGES_ROUTES = RouterModule.forRoot(pagesRoutes,{useHash:true})