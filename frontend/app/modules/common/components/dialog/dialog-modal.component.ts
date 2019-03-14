import { Component} from '@angular/core';
import { DialogModalState } from './dialog-modal-state.service';


@Component({
    selector: 'dialog-modal-component',
    templateUrl: './dialog-modal.html'
})
export class DialogModalComponent{

    options: DialogModalOptions;

    constructor(private state: DialogModalState) {
        this.options = state.options;
    }

    yes() {
        this.state.modal.close('confirmed');
    }

    no() {
        this.state.modal.dismiss('not confirmed');
    }


}