//default
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing-module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//nuevos
import { LoginComponent } from '../app/Vistas/login/login.component';
import { CompartidosModule } from '../app/ZModulos/compartidos.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    //default
    AppComponent,

    //nuevos
    LoginComponent
    //NotFoundComponent
  ],

  imports: [
    //default
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    //nuevos
    NgxMaskModule.forRoot(),
    CompartidosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }