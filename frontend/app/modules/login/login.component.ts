import { Component } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { Router} from '@angular/router';
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

    constructor(private router: Router) { 
            this.model = new Login(); 
    }

    ngOnInit(): void {
        
    }

    login(): void {
        // ustente loggato
        this.router.navigate(['/application']);
    }

    clear(): void {
        this.model = new Login(); 
    }

}
