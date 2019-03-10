import { Component, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ICellRendererAngularComp, Ng2FrameworkComponentWrapper } from "ag-grid-angular/main";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MachineService } from '../../../common/service/machine.service'
import { Machine } from '../../../common/model/machine';
import { NgForm } from '@angular/forms';



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

    @ViewChild('f') machineForm: NgForm;

    niceMachineId: string;
    model: Machine;

    @Input() createFlag: boolean;

    agInit(params: any): void {
        this.params = params;
    }


    constructor(private modalService: NgbModal,
        private machineService: MachineService) {
        this.model = new Machine();
    }

    public open(content) {

        if (this.params) {
            this.model.machineId = this.params.rowIndex + 1;
        }
        else{
            this.machineService.getAllMachines()
                .subscribe(
                    machines => {
                        this.model.machineId = (Number(machines.length) + Number(1)).toString();
                    },
                    error => this.errorMessage = <any>error
                )
        }

        this.modalService.open(content).result.then((result) => {
            if (result == "Confirm") {
                if (this.machineForm.valid) {
                    // rest service insert
                    console.log(this.model);
                }
                this.machineService.updateStatus("OK", this.niceMachineId)
                    .subscribe(
                        result => {
                            // this.updateStatusChange.emit(result)
                        },
                        error => this.errorMessage = <any>error);
            }
            else {
                this.closeResult = `Closed with: ${result}`;
                //this.emitService.myEvent.emit(result)
                // this.updateStatusChange.emit(result)
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