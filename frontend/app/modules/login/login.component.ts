import { Component } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { Router } from '@angular/router';
import { Login } from './model/login';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;
    token: string;

    constructor(private router: Router) {
        this.model = new Login();
    }

    ngOnInit(): void {

    }

    login(): void {
        // utente loggato 
        if (this.model.username === 'nice' && this.model.password === 'nice') {
            this.token = "?token=NiCpqU9yV59x4m8yFvL4X01OthtxCEh6";
            this.router.navigate(['/application' + this.token]);

            return;
        }
        if (this.model.username !== 'nice') { this.model.username = null }
        if (this.model.password !== 'nice') { this.model.password = null }

        return;
    }


    clear(): void {
        this.model = new Login();
    }

}
