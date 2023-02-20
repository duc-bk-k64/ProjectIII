import { async } from 'rxjs';
import { AuthService } from './../../../service/auth.service';
import { getServerApiUrl,storageKey } from './../../../../app-constant';
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { SecureStorageService } from 'src/app/app-management/storage/secure-storage.service';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password: any;
    username: any;
    rememberMe: boolean = false;
    loading: boolean = false;

    constructor(public layoutService: LayoutService,private messageService: MessageService,private authService:AuthService ,private router: Router,public httpClient: HttpClient, public secureStorageService : SecureStorageService ) { }
     async login() {
        // console.log(this.rememberMe)
       this.loading = true;
       await this.httpClient.post<any>('/api/authenticate',{'username':this.username,'password':this.password,'rememberMe':this.rememberMe}).toPromise().then(
           data => {
               
                    this.authService.setToken(data.id_token);
                    this.router.navigate([this.authService.getRedirectUrl()]);
               
            },
            error => {
                this.messageService.add({severity:"error", summary:"Username or password incorrect"});

            }
            
        )
        this.loading = false;
        

    }
}
