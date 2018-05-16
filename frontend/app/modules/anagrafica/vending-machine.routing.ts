import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendingMachineComponent } from './vending-machine.component';



const loginRoute: Routes = [
  {
    path: '',
    component: VendingMachineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoute)],
  exports: [RouterModule],
})

export class VendingMachineRoutingModule {

 
}