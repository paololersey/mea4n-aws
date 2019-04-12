import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { ICellRendererAngularComp, Ng2FrameworkComponentWrapper } from "ag-grid-angular/main";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MachineService } from '../../../common/service/machine.service'
import { Machine } from '../../../common/model/machine';
import { NgForm } from '@angular/forms';
import { DialogModalService } from '../../../common/components/dialog/dialog-modal.service';
import { stat } from 'fs';

@Component({
    selector: 'machine-dialog',
    templateUrl: './machine-dialog.component.html',
    styleUrls: ['./machine-dialog.css'],
    providers: [MachineService]

})
export class MachineDialogComponent implements OnInit, ICellRendererAngularComp {
    closeResult: string;
    errorMessage: string;
    public params: any;
    private machinesFromSearch: Machine[] = [];
    private machinesFromSearchFilteredByCellNumber: Machine[] = [];

    // @ViewChild('f') machineForm: NgForm;

    niceMachineId: string;
    originaryModel: Machine;
    model: Machine;
    statusList: any[];
    proceedFlag: boolean = false;

    @Input() createFlag: boolean = false;


    agInit(params: any): void {
        this.params = params;
    }



    constructor(private modalService: NgbModal, private dialogModalService: DialogModalService
        , private machineService: MachineService) {
        this.model = new Machine();

    }


    ngOnInit() {
        this.originaryModel = new Machine();

        this.statusList = [
            {
                'id': 'ACTIVE',
                'name': 'ACTIVE'
            },
            {
                'id': 'INACTIVE',
                'name': 'INACTIVE'
            }
        ];
    }

    public open(content) {
        this.model = new Machine();
        this.machineService.getAllMachines()
            .subscribe(
                machines => {
                    if (this.createFlag) this.model.machineId = (Number(machines.length) + Number(1)).toString();
                    this.machinesFromSearch = machines;
                },
                error => this.errorMessage = <any>error
            )

        // Edit mode
        if (!this.createFlag && this.params) {
            this.model = { ...this.params.data };
            this.originaryModel = { ...this.params.data };
        }
        else {
            this.model.status = 'OK';
        }
        
        this.modalService.open(content).result.then((result) => {
            if (result == "Confirm") {
                this.machinesFromSearchFilteredByCellNumber = [];
                if (this.createFlag) {
                    this.machinesFromSearchFilteredByCellNumber = this.machinesFromSearch.filter(element =>
                        element.machineCurrentNumber === this.model.machineCurrentNumber)
                }
                else {
                    this.machinesFromSearchFilteredByCellNumber = this.machinesFromSearch.filter(element =>
                        element.machineCurrentNumber === this.model.machineCurrentNumber
                        && element.machineCurrentNumber !== this.originaryModel.machineCurrentNumber
                    )
                }
                if (this.machinesFromSearchFilteredByCellNumber.length > 0) {
                    /* check same number */
                    this.dialogModalService.confirm({
                        title: 'Warning', type: 'Warning',
                        message: 'You have chosen a number already used: chosen number = ' +
                            this.machinesFromSearchFilteredByCellNumber[0].machineCurrentNumber + ' for N-ICE machine ' + this.machinesFromSearchFilteredByCellNumber[0].machineId,
                    }).then()
                    {
                        () => { }
                        () => { this.closeResult = `Dismissed ${this.getDismissReason('by click CANCEL')}`; }
                    }
                    return
                }

                this.dialogModalService.confirm({ title: 'Confirm insert', message: 'Do you really want to confirm?', type: 'Confirm' }).then(
                    () => {
                        this.machineService.insertUpdateMachine(this.model, this.createFlag ? true : false)
                            .subscribe(
                                result => {
                                    this.dialogModalService.confirm({
                                        title: 'Success', type: 'Info',
                                        message: 'The operation has ended successfully',
                                    }).then()
                                    {
                                        () => { }
                                        () => { this.closeResult = `Dismissed ${this.getDismissReason('by click Ok')}`; }
                                    }
                                },
                                error => this.errorMessage = <any>error);
                    },
                    () => {
                        this.closeResult = `Dismissed ${this.getDismissReason('by click Cancel')}`;
                    });

                console.log(this)
            }
            else {
                this.closeResult = `Closed with: ${result}`;
            }

        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    disableConfirmButton(form) {
        return (form.invalid) ||
            (form.pristine && !this.createFlag) ||
            this.checkUnchangedValueOnEdit(form);
    }

    checkUnchangedValueOnEdit(form) {
        if (!this.createFlag) {
            return (form.value.status === this.originaryModel.status) &&
                (form.value.machineCurrentNumber === this.originaryModel.machineCurrentNumber)
        }
        return false;
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