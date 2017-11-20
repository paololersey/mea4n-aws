import { Component, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MachineService } from '../../common/service/machine.service'
import { EmitService } from '../../common/service/emit.service'


@Component({
    selector: 'reset-breakdown-modal',
    templateUrl: './reset-breakdown-modal.component.html',
    styleUrls: ['./reset-breakdown-modal.component.css'],
    providers: [ EmitService]

})
export class ResetBreakdownModalComponent implements ICellRendererAngularComp {
    closeResult: string;
    errorMessage: string;
    public params: any;

    @Output('statusChange')
    updateStatusChange: EventEmitter<any> = new EventEmitter();


    agInit(params: any): void {
        this.params = params;
    }
    
    constructor(private modalService: NgbModal, private machineService: MachineService,
        private emitService: EmitService) { }

    public open(content) {
        let niceMachineId = this.params.rowIndex + 1;
        this.modalService.open(content).result.then((result) => {
            if (result == "Confirm") {
                this.machineService.updateStatus("OK", niceMachineId)
                    .subscribe(
                    result => {
                        this.updateStatusChange.emit(result)
                    },
                    error => this.errorMessage = <any>error);
            }
            else {
                this.closeResult = `Closed with: ${result}`;
                //this.emitService.myEvent.emit(result)
                this.updateStatusChange.emit(result)
            }

        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        //this.params.context.componentParent.methodFromParent(`Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`)
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}