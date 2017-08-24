import { Component } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UpdateStatusMachineService } from '../service/update-status-machine.service'


@Component({
    selector: 'reset-breakdown-modal',
    templateUrl: './reset-breakdown-modal.component.html',
    styleUrls: ['./reset-breakdown-modal.component.css'],
    providers: [UpdateStatusMachineService]
})
export class ResetBreakdownModalComponent implements ICellRendererAngularComp {
    closeResult: string;
    errorMessage: string;
    public params: any;

    agInit(params: any): void {
        this.params = params;
    }
    constructor(private modalService: NgbModal, private updateStatusMachineService: UpdateStatusMachineService) { }

    public open(content) {
        let niceMachineId = this.params.rowIndex + 1;
        this.modalService.open(content).result.then((result) => {
            if (result == "Confirm") {
                this.updateStatusMachineService.updateStatus("OK", niceMachineId)
                    .subscribe(
                    result => result,
                    error => this.errorMessage = <any>error);
            }
            else {
                this.closeResult = `Closed with: ${result}`;
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