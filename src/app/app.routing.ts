import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesComponent } from './pages/pages.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoggedGuard } from './services/guards/logged.guard';

const appRoutes:Routes = [   
    {
        path: 'login',
        canActivate:[LoggedGuard],
        component: LoginComponent
    },
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:true})