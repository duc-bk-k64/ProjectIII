import { AuthGuardStudent } from './app-management/service/authGuard-Student';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './app-management/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './app-management/service/auth-guard';
import { OnlineExamComponent } from './app-management/components/online-exam/online-exam.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./app-management/components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard] },
                    { path: 'pages', loadChildren: () => import('./app-management/components/pages/pages.module').then(m => m.PagesModule) ,canActivate:[AuthGuard]},
                ],
                canActivate:[AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./app-management/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./app-management/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: 'onlineExam', component:OnlineExamComponent, canActivate:[AuthGuard,AuthGuardStudent]},
            { path: '**', redirectTo: 'pages/notfound' },
    
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}