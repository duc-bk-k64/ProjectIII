import { AuthGuard } from './app-management/service/auth-guard';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './app-management/components/notfound/notfound.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ConfirmationService, MessageService } from 'primeng/api';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
      AuthGuard,JwtHelperService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        MessageService,ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
