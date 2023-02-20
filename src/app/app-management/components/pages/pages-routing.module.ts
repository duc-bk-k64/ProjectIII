import { StudentExamListComponent } from './student-exam-list/student-exam-list.component';
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
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'account', component:AccountManagementComponent},
        { path: 'subject', component: SubjectManagementComponent},
        { path: 'question', component: QuestionManagementComponent},
        { path: 'examclass',component:ExamclassManagementComponent},
        { path: 'exam-statistics', component: ExamStatisticsComponent },
        { path: 'examclass/:id', component:ExamclassDetailComponent},
        { path: 'exam-point-statistics',component:ExamPointStatisticsComponent},
        { path: 'view-exam',component:ViewExamComponent},
        { path: 'student-exam-list',component:StudentExamListComponent},
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
