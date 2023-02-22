import { CompletedAnswer } from './../../../Model/CompletedAnswer';
import { CompletedQuestion } from './../../../Model/CompletedQuestion';
import { Answer } from './../../../Model/Answer';
import {  storageKey } from './../../../../app-constant';
import { Question } from './../../../Model/Question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { MessageService } from 'primeng/api';
import { Exam } from '../../../Model/Exam';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html'
})
export class ExamResultComponent implements OnInit {

  constructor(private route: ActivatedRoute, public http: HttpClient,public router: Router, private authService: AuthService,private messageService: MessageService) {
   
   }

  selected: any;
  questions : CompletedQuestion[] = [];
  answers : any[] = [];
  listAnswer: any[] = [];
  examName : String ='';
  expired: boolean = false;
  answerDTO : CompletedAnswer = {};
  exam: Exam[] = []
  typeQuestion = ['SINGLE_SELECT','MULTI_SELECT','FILL_IN_BLANK']
  studentId:any;
  studentName: String = '';
  studentInfo : any;
  examClassId:any;
  studentScore : number = -1;
  loading: boolean = true;
  header:any;
  numberOfQuestions : number =0;
  numberOfTrueAnswer: number = 0;
  examInfo : any;
  ngOnInit(): void {
    this.examClassId =  this.route.snapshot.params['examId']
    this.studentId=this.route.snapshot.params['studentId']
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.loadExamInfo();
    this.loadStudentInfo();
    this.loadInfo();
    this.loadQuestion()
  }

  async loadInfo() {
    await this.http.get<any>("/api/exam-class-students?examClassId.equals="+this.examClassId
        +"&studentId.equals="+"44"+"&page=0&size=20",
        {headers: this.header}).toPromise().then(
      data => {
        if(data?.content.length > 0){
        this.studentScore = data?.content[0].score || -1;
        }
      },
      error => {   
        console.log(error)
      }
    );
  }

  async loadExamInfo() {
    await this.http.get<any>("/api/exam-classes/"+this.examClassId,{headers: this.header}).toPromise().then(
      data => {
        this.examName = data?.name ||"Unknow" 
      },
      error => {
        console.log(error)
      }
    );
  }
  async loadStudentInfo() {
    await this.http.get<any>("/api/students/"+this.studentId,{headers: this.header}).toPromise().then(
      data => {
        this.studentName = data?.fullname || "Unknow"
      },
      error => {   
        console.log(error)
      }
    );
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
      let qs = {} as CompletedQuestion; 
      let  aw = {} as CompletedAnswer ; 
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
        qs.is_correct =this.exam[i].is_correct;
        if(this.exam[i].is_correct) this.numberOfTrueAnswer++;
        this.questions.push(qs)
        this.numberOfQuestions ++;
        if(qs.type == 'MULTI_SELECT')
          this.listAnswer.push(this.exam[i].content?.split(" "))
        this.listAnswer.push(this.exam[i].content)
      }
    }
    this.loading =false;
    // console.log(this.questions)
   
  
  }
}
