import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//router
import { APP_ROUTES } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { SocketIoModule } from 'ngx-socket-io';


import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages/pages.routing';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    APP_ROUTES,
    PAGES_ROUTES,
    SocketIoModule.forRoot( environment.socketConfig ),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
