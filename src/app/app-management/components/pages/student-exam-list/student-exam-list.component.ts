import { Component, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/BaseClass';
// import { BaseClass } from 'src/app/base-class';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'primeng/dynamicdialog';
@Component({
    selector: 'app-student-exam-list',
    templateUrl: './student-exam-list.component.html',
    styleUrls: ['./student-exam-list.component.scss'],
})
export class StudentExamListComponent extends BaseClass implements OnInit {
    // filterExam: FormControl
    header: any;

    listExam: any[] = [];
    dataSource = new MatTableDataSource<any>();
    timeNow = Date.now();
    displayedColumns: string[] = [
        'name',
        'startTime',
        'endTime',
        'numberOfQuestion',
        'numberOfStudent',
    ];
    dataTable: any = [];
    filterLopThi = new FormControl('');
    filteredLopThi: any = [];
    dsLopThi: any;
    constructor(
        public service: ExamClassService,
        private httpClient: HttpClient,
        private router: Router,
        private messageService: MessageService,
        private authService: AuthService,
        public dialog: MatDialog,
        public dialogService: DialogService
    ) {
        super();
    }

    ngOnInit(): void {
        this.header = new HttpHeaders().set(
            storageKey.AUTHORIZATION,
            this.authService.getToken()
        );
        this.getList();
        this.filterLopThi.valueChanges.subscribe({
            next: (value) => {
                this.filteredLopThi = this.dsLopThi.filter();
            },
        });
    }
    formatDate(time : Date){
        return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toString()+' ' + time.getDate() +'/'+ time.getMonth()+1 +'/'+time.getFullYear();
    }
    getDuration(startTime: Date, endTime:Date){
        var duration =  Math.floor((endTime.getTime() - startTime.getTime())/1000);
        if(duration == 3600) 
            return "60m";
        var hour = Math.floor(duration/(60*60)) ?Math.floor(( duration/(60*60))).toString()+'h' : '' ;
        var min = Math.floor( duration/60) % 60 +'m' ;
        return hour +min;
    }
    getList() {
        this.service.getListExamOfStudent().subscribe((response) => {
            
            console.log("aaa", response)
            this.listExam = response.map((item:any) => {
                let state; 
                // item.startTime ='2023-02-19T20:05:25.175Z';
                // item.endTime ='2023-02-19T21:05:25.175Z';

                if(Date.now() < Date.parse(item.startTime)){
                    state = 'initial'
                    item.countdown = this.getDuration(new Date,  new Date(item.startTime))
                }
                else if( Date.now() < Date.parse(item.endTime)){
                    state = 'running'
                    item.countdown = this.getDuration(new Date,  new Date(item.endTime))
                }
                else state = 'timeout'
                item.state = state;
                let startTime = new Date(item.startTime)
                let endTime = new Date(item.endTime)

                item.startTime =  this.formatDate(startTime )
                item.endTime =  this.formatDate( endTime )
                item.duration = this.getDuration(startTime,endTime)
                return item
            
            });
        });
    }
}
