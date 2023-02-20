import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
           
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                   
                    {
                        label: 'Account Management',
                        icon: 'pi pi-fw pi-sign-in',
                        routerLink: ['/pages/account']
                    },
                    {
                        label: 'Exam List',
                        icon: 'pi pi-fw pi-sign-in',
                        routerLink: ['/pages/exam-list']
                    },
                    {
                        label: 'Exam Statistics',
                        icon: 'pi pi-fw pi-sign-in',
                        routerLink: ['/pages/exam-statistics']
                    }
                  
                ]
            },
         
        ];
    }
}
