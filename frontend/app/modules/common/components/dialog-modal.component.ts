import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DialogModalService } from '../service/dialog-modal.service'


@Component({
    selector: 'modaldialog',
    templateUrl: '../view/dialog-modal.html',
    //styleUrls: ['./reset-breakdown-modal.component.css'],
    providers: [DialogModalService]

})
export class DialogModalComponent  implements OnInit {
    closeResult: string;

    @Input()
    public content: any = {};

    constructor(private dialogModalService: DialogModalService) { }
    
    ngOnInit(): void {
        this.dialogModalService.open(this.content);
    }
    
    
}