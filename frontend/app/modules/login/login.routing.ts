import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';



const loginRoute: Routes = [
    {
      path : '',
      component : LoginComponent
    }
  ];
  
  @NgModule ( {
    imports : [ RouterModule.forChild ( loginRoute) ],
    exports : [ RouterModule ],
  } )
  
  export class LoginRoutingModule {
  }