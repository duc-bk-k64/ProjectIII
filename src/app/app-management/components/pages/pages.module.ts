import { AppComponent } from './../../../app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
import { RouterModule, Routes } from '@angular/router';
import {PasswordModule} from 'primeng/password';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ExamclassManagementComponent } from './examclass-management/examclass-management.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ExamStatisticsComponent } from './exam-statistics/exam-statistics.component';
import { DialogAddExamComponent } from './examclass-management/dialog-add-exam/dialog-add-exam.component';
import { InputNumberModule } from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import { ExamclassDetailComponent } from './examclass-management/examclass-detail/examclass-detail.component';
import { AuthGuard } from '../../service/auth-guard';
const routes: Routes = [
  {
    path:'examclass-detail',
    component:ExamclassDetailComponent,
    canActivate:[AuthGuard]
  }
]
@NgModule({
    declarations: [
   
  
    AccountManagementComponent,
             ExamclassManagementComponent,
             ExamStatisticsComponent,
             DialogAddExamComponent,
             ExamclassDetailComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ToastModule,
        TableModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        TooltipModule,
        MultiSelectModule,
        ConfirmDialogModule,
        DropdownModule,
        PasswordModule,
        MatTableModule,
        MatCardModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        InputNumberModule,
        CalendarModule,
        CardModule,
        CascadeSelectModule
    ]
})
export class PagesModule { }
