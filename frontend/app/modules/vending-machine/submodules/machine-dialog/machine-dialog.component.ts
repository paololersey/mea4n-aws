import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MachineService } from '../../../common/service/machine.service'



@Component({
    selector: 'machine-dialog',
    templateUrl: './machine-dialog.component.html',
    styleUrls: ['./machine-dialog.css'],
    providers: [MachineService]

})
export class MachineDialogComponent implements ICellRendererAngularComp {
    closeResult: string;
    errorMessage: string;
    public params: any;

    @Output('statusChange')
    updateStatusChange: EventEmitter<any> = new EventEmitter();
    niceMachineId: string;

    @Input() createFlag: boolean;

    agInit(params: any): void {
        this.params = params;
    }

    constructor(private modalService: NgbModal,
        private machineService: MachineService) { }

    public open(content) {
        if (this.params) {
            this.niceMachineId = this.params.rowIndex + 1;
        }

        this.modalService.open(content).result.then((result) => {
            if (result == "Confirm") {
                this.machineService.updateStatus("OK", this.niceMachineId)
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