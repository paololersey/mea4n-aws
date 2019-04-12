import { NgModule } from '@angular/core';
import { DialogModalComponent } from './dialog-modal.component';
import { DialogModalState } from './dialog-modal-state.service';
import { DialogModalService } from './dialog-modal.service';
import { DialogModalTemplateDirective } from './dialog-modal-template.directive';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [CommonModule],
    declarations: [DialogModalComponent, DialogModalTemplateDirective],
    providers: [DialogModalState, DialogModalService],
    exports: [DialogModalComponent, DialogModalTemplateDirective]
})
export class DialogModalModule { }