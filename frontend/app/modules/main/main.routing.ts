import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './../report/components/report.component';
import { VendingMachineComponent } from './../vending-machine/vending-machine.component';
import { MainComponent } from './../main/main.component';

const MainRoute: Routes = [
    {
        path: '',
        component: MainComponent
    },

    { path: 'vending-machine', loadChildren: './../vending-machine/vending-machine.module#VendingMachineModule' }

];

@NgModule({
    imports: [RouterModule.forChild(MainRoute)],
    exports: [RouterModule],
})

export class MainRoutingModule {
}