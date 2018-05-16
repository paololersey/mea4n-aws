import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './../report/components/report.component';
import { VendingMachineComponent } from './../anagrafica/vending-machine.component';
import { MainComponent } from './../main/main.component';

const MainRoute: Routes = [
    {
        path: '',
        component: MainComponent
    },

    { path: 'vending-machine', loadChildren: './../anagrafica/vending-machine.module#VendingMachineModule' }

];

@NgModule({
    imports: [RouterModule.forChild(MainRoute)],
    exports: [RouterModule],
})

export class MainRoutingModule {
}