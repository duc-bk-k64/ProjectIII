import { AuthGuardAdmin } from './../../service/authGuard-Admin';
import { ExamStatisticsComponent } from './exam-statistics/exam-statistics.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ExamclassDetailComponent } from './examclass-management/examclass-detail/examclass-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamclassManagementComponent } from './examclass-management/examclass-management.component';
import { ExamPointStatisticsComponent } from './exam-point-statistics/exam-point-statistics.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { SubjectManagementComponent } from './subject-management/subject-management.component';
import { QuestionManagementComponent } from './question-management/question-management.component';
import { AuthGuardTeacher } from '../../service/authGuard-Teacher';
import { AuthGuardStudent } from '../../service/authGuard-Student';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'account', component:AccountManagementComponent,canActivate:[AuthGuardAdmin]},
        { path: 'subject', component: SubjectManagementComponent,canActivate:[AuthGuardAdmin]},
        { path: 'question', component: QuestionManagementComponent,canActivate:[AuthGuardTeacher]},
        { path:'examclass',component:ExamclassManagementComponent},
        { path: 'exam-statistics', component: ExamStatisticsComponent, canActivate:[AuthGuardTeacher]},
        { path:'examclass/:id', component:ExamclassDetailComponent},
        {path : 'exam-point-statistics',component:ExamPointStatisticsComponent,canActivate:[AuthGuardTeacher]},
        {path : 'view-exam',component:ViewExamComponent,canActivate:[AuthGuardStudent]},
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
