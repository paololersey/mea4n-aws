import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { MachineDialogComponent } from '../machine-dialog/machine-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [SharedModule, FormsModule],
    declarations: [MachineDialogComponent],
    exports: [MachineDialogComponent]
})
export class MachineDialogModule { }