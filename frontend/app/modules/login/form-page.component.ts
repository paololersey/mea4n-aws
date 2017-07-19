import { Component } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { Login } from './model/login';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'form-page',
    templateUrl: 'form-page.component.html',
    styleUrls: ['./form-page.component.css']
})
export class FormPageComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;

    constructor() { 
            this.model = new Login(); 
    }

    ngOnInit(): void {
        
    }

    login(): void {
        console.log("ijsjc")
    }

     clear(): void {
        this.model = new Login(); 
    }

}
