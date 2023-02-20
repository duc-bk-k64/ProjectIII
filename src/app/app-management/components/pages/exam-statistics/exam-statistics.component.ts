
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { storageKey } from 'src/app/app-constant';
import { AuthService } from 'src/app/app-management/service/auth.service';

@Component({
  selector: 'app-exam-statistics',
  templateUrl: './exam-statistics.component.html'
})
export class ExamStatisticsComponent implements OnInit {

  constructor(private authService: AuthService,private httpClient: HttpClient,private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
    localStorage.setItem("examClassIdStatistic","74");
    this.examClassId =  localStorage.getItem("examClassIdStatistic")||'';
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.loadStatisticsData();
    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };

  }
  basicData: any;
  basicOptions : any;
  header : any;
  examClassId: string = '';
  examClassName: string = "BÀI THI ĐẠI SỐ TUYẾN TÍNH"
  statisticsData: any[] = [];
  listLabel: string[] = [];
  listCorrectAnswer: number[] = [];
  listIncorrectAnswer: number[] = [];
  listTotalAnswer: number[] = [];
  async loadStatisticsData() {
    await this.httpClient.get<any>("/api/questions/exam-class/"+this.examClassId,{headers: this.header}).toPromise().then(data => {
      try {
        this.statisticsData=data;
        // console.log(this.statisticsData);
     } catch (error) {
         this.messageService.add({severity:data.title, summary:data.detail});
     }

     },
     error => {
      console.log(error)
      // this.router.navigate(['/auth/error']);
     }
     );
     for(let i = 0;i<this.statisticsData.length;i++) {
      this.listLabel.push("Câu "+(i+1));
      this.listCorrectAnswer.push(this.statisticsData[i].noCorrectAnswered);
      this.listIncorrectAnswer.push(this.statisticsData[i].noFailAnswered);
      this.listTotalAnswer.push(this.statisticsData[i].noCorrectAnswered+this.statisticsData[i].noFailAnswered);
     }
     this.basicData = {
    labels: this.listLabel,
    datasets: [
        {
            label: 'Số câu trả lời đúng',
            backgroundColor: '#42A5F5',
            data:this.listCorrectAnswer
        },
        {
            label: 'Số câu trả lời sai',
            backgroundColor: '#FFA726',
            data: this.listIncorrectAnswer
        },
        {
          label: 'Tổng số câu trả lời',
          backgroundColor: '#AABBCC',
          data: this.listTotalAnswer
        }
    ]
   };
    //  console.log(this.basicData)
  }

}
