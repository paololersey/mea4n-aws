import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DialogModalService } from '../../service/dialog-modal.service'


@Component({
    selector: 'modaldialog',
    templateUrl: './dialog-modal.html',
    //styleUrls: ['./reset-breakdown-modal.component.css']

})
export class DialogModalComponent  implements OnInit {
    closeResult: string;

  //  @Input()
    public content: any = {};

    constructor(private dialogModalService: DialogModalService, private modalService:NgbModal) { }
    
    ngOnInit(): void {
        this.content="MESSAGGIO"
        this.modalService.open(this.content).result.then((result) => {
            if (result == "Confirm") {
               
            }
            else {
               
            }

        }, (reason) => {
           
        });
        //this.dialogModalService.open(this.content);
        
    }
    
}