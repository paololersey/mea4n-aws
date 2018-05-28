import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { GridVendingMachineComponent } from './grid-vending-machine.component';

@NgModule({
    imports: [SharedModule],
    declarations: [ GridVendingMachineComponent ],
    exports: [ GridVendingMachineComponent]
})
export class  GridVendingMachineModule { }