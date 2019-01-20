import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { MachineDialogComponent } from '../machine-dialog/machine-dialog.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    imports: [SharedModule],
    declarations: [MachineDialogComponent],
    exports: [MachineDialogComponent]
})
export class MachineDialogModule { }