import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { GridVendingMachineComponent } from './grid-vending-machine.component';
import { MachineDialogComponent } from '../machine-dialog/machine-dialog.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    imports: [SharedModule, AgGridModule.withComponents([MachineDialogComponent])],
    declarations: [GridVendingMachineComponent],
    exports: [GridVendingMachineComponent, AgGridModule]
})
export class GridVendingMachineModule { }