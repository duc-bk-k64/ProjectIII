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
import { CheckboxModule } from 'primeng/checkbox';
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
import {ChartModule} from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingComponent } from './loading/loading.component';
import { ExamclassDetailComponent } from './examclass-management/examclass-detail/examclass-detail.component';
import { AuthGuard } from '../../service/auth-guard';
import { DialogAddStudentComponent } from './examclass-management/dialog-add-student/dialog-add-student.component';
import { ExamPointStatisticsComponent } from './exam-point-statistics/exam-point-statistics.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { SubjectManagementComponent } from './subject-management/subject-management.component';
import { QuestionManagementComponent } from './question-management/question-management.component';

@NgModule({
    declarations: [
   
  
    AccountManagementComponent,
             ExamclassManagementComponent,
             ExamStatisticsComponent,
             DialogAddExamComponent,
            ExamPointStatisticsComponent,
            ExamclassDetailComponent,
            DialogAddStudentComponent,
            LoadingComponent,
            ViewExamComponent,
            SubjectManagementComponent,
            QuestionManagementComponent,
         

  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        CheckboxModule,
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
        CascadeSelectModule,
        ChartModule,
        ProgressSpinnerModule,
        ToggleButtonModule
    ],
    exports: [LoadingComponent]
})
export class PagesModule { }
