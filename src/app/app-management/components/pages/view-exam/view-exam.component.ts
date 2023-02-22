import { Component, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/BaseClass';
// import { BaseClass } from 'src/app/base-class';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService  } from 'src/app/app-management/service/auth.service';
@Component({
  selector: 'app-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.scss']
})
export class ViewExamComponent extends BaseClass implements OnInit  {
  header: any;
  exam:any
  today = new Date();
  hour:any;
  minutes:any
  chenh:any
  isStart: boolean =true
  constructor(
    public service: ExamClassService, private httpClient: HttpClient, private router: Router, private messageService: MessageService,
    private authService: AuthService, private route : ActivatedRoute
  ) { super()}

  ngOnInit(): void {
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION, this.authService.getToken());

    this.getDetailExam(this.route.snapshot.params["id"])
   console.log(this.today)
   console.log(this.exam.startTime)
  }
 getDetailExam(item: any) {
    this.service.getDetailExam(item).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (rs: any) => {
          console.log(rs)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tìm kiếm thành công' });
          this.exam=rs
          localStorage.setItem("examName",this.exam.name);
          this.chenh=(new Date(this.exam.startTime).getTime()-this.today.getTime()) / (1000 * 60);
          if(this.chenh>0){
            this.isStart=true
           this.hour = Math.floor( this.chenh / 60);
          this.minutes =  this.chenh % 60;}
          else{this.isStart=false}
        },
        error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
        }
        
      )
    
  }
}
