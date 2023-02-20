import { Answer } from './../../Model/Answer';
import {  storageKey } from './../../../app-constant';
import { Question } from './../../Model/Question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';
import { Exam } from '../../Model/Exam';

@Component({
  selector: 'app-online-exam',
  templateUrl: './online-exam.component.html'
})
export class OnlineExamComponent implements OnInit {

  constructor(public http: HttpClient,public router: Router, private authService: AuthService,private messageService: MessageService) {
   
   }

  selected: any;
  questions : Question[] = [];
  answers : any[] = [];
  listAnswer: any[] = [];
  examName : String = "BÀI THI ĐẠI SỐ TUYẾN TÍNH";
  expired: boolean = false;
  answerDTO : Answer = {};
  exam: Exam[] = []
  typeQuestion = ['SINGLE_SELECT','MULTI_SELECT','FILL_IN_BLANK']
  studentId:any;
  examClassId:any;
  studentScore : number = -1;
  loading: boolean = true;
  ngOnInit(): void {
    localStorage.setItem("studentId","4");
    localStorage.setItem("examClassId","74");
    this.studentId=localStorage.getItem("studentId");
    this.examClassId=localStorage.getItem("examClassId");
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.loadQuestion();
    var x = setInterval(()=>{
      --this.counter;
      if(this.counter < 0) {
        clearInterval(x)
        this.min="EXPIRED";
        this.second=null;
        this.expired = true;
      }
      else {
        this.min = Math.floor(this.counter/60);
        this.second =this.counter%60;
      }


    },1000)
   

    
  }
  countDown:any;
  counter = 1800;
  tick = 1000;
  min :any;
  second : any;
  header:any;
  studentAnswerSubmit : any[] = [];
  async submit() {
    this.loading = true;
    this.expired = true;
    for(let i=0; i<this.questions.length;i++) {
      if(this.listAnswer[i]==undefined) this.listAnswer[i] = '-1';
      if(this.questions[i].type == "FILL_IN_BLANK") {
        this.listAnswer[i] = this.listAnswer[i].replace(/\s{2,}/g, ' ').trim().split(" ").toString();
      }
      else  {
        this.listAnswer[i] = this.listAnswer[i].toString();
      }
      let studentAnswer = {
        "id":this.questions[i].id,
        "content":this.listAnswer[i],
        "examClass" : {
          "id":this.examClassId
        },
        "question" : {
          "id":this.questions[i].question_id,
          "type":this.questions[i].type
        },
        "student": {
          "id":this.studentId
        }
      }
      this.studentAnswerSubmit.push(studentAnswer)
    }
    await this.http.post<any>("/api/student-answers/submit",{"studentAnswerDTOS":this.studentAnswerSubmit},{headers: this.header}).toPromise().then(
      data => {
        this.studentScore = data;
        localStorage.setItem("score",data);
        console.log(data)
        this.messageService.add({severity:'success', summary:'Nộp bài thành công'});
        this.counter=0;
        setTimeout(()=>{this.router.navigate(['/pages/home']);},2000)
        
      },
      error => {
        console.log(error.error)
        this.messageService.add({severity:'error', summary:error.error.title, detail:error.error.detail});

      }
    )
    this.loading = false;
  }
  async loadQuestion() {
    await this.http.get<any>("/api/student-answers/exam?studentId="+this.studentId+"&examClassId="+this.examClassId,{headers: this.header}).toPromise().then(
      data => {
        this.exam = data;
        // console.log(this.exam)
      },
      error => {
        console.log(error)
      }
    );
    for(let i = 0;i<this.exam.length ; i++) {
      let qs = {} as Question; 
      let  aw = {} as Answer ; 
      let index = this.questions.findIndex(e => e.id === this.exam[i].id)
      aw.id = this.exam[i].answerId;
      aw.content = this.exam[i].answerContent;
      if(index > -1) {
        this.questions[index].answerDTOs?.push(aw)
      } else {
        qs.id=this.exam[i].id;
        qs.content=this.exam[i].questionContent;
        qs.images = this.exam[i].images;
        qs.type=this.exam[i].questionType;
        qs.answerDTOs = [aw]
        qs.question_id = this.exam[i].question_id;
        this.questions.push(qs)
      }
    }
    this.loading =false;
    // console.log(this.questions)
   
  
  }
}
