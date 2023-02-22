import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { BaseClass } from 'src/app/BaseClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { StudentService} from 'src/app/app-management/service/student.service';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Student } from 'src/app/app-management/Model/Student';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-exam-point-statistics',
  templateUrl: './exam-point-statistics.component.html',
  styleUrls: ['./exam-point-statistics.component.scss']
})
export class ExamPointStatisticsComponent extends BaseClass implements OnInit  {
  listSV:any[]=[];
  listSVSelected:any[]=[];
  header: any;
  listExam: any[] = [];
  dataTable: any = [];
  filterLopThi = new FormControl('');
  filteredLopThi: any = [];
  dsLopThi: any;
  searchLopThi:any
  data: any;
  chartOptions : any;
 listDiemYeu=0
 listDiemKha=0
 listDiemGioi=0
 loading: boolean = false;
  constructor(public service: ExamClassService,public serviceSV: StudentService, private httpClient: HttpClient, private router: Router, private messageService: MessageService,
    private authService: AuthService,private route: ActivatedRoute) { 
    super()
  }
  @ViewChild('dt2') dt2: Table | undefined;
  ngOnInit(): void {
    this.searchLopThi=74
    this.getList()
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION, this.authService.getToken());
    this.getListSV()
   
  console.log(this.data)
  } 
  
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt2!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  getListSV(){
    this.serviceSV.getListSV(this.searchLopThi).pipe(this.unsubsribeOnDestroy)
  .subscribe(
    (rs: any) => {
      console.log(rs)
      this.loading = false;
      for(let i=0;i<rs.length;i++){
        if (rs[i].score) {
          if(rs[i].score>0 && rs[i].score<=4){
              this.listDiemYeu =this.listDiemYeu+1
          }else if(rs[i].score>4 && rs[i].score<8){
            this.listDiemKha=this.listDiemKha+1
          }else{
            this.listDiemGioi=this.listDiemGioi+1
          }
        }else{
          
        }
      }
      this.data = {
        labels: ['Điểm yếu (0-4)','Điểm khá(5-7)','Điểm giỏi(9-10)'],
              datasets: [
                  {
                      data: [this.listDiemYeu, this.listDiemKha, this.listDiemGioi],
                      backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56"
                      ],
                      hoverBackgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56"
                      ]
                  }
              ]
       };
      console.log(this.listDiemGioi)
      console.log(this.searchLopThi)
     this.listSV=rs
      
    },
  )
  this.loading = true;
  }
  getList() {
    this.listExam = []
    this.service.getListExam().pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (rs: any) => {
          console.log(rs)
          this.dataTable = rs.content
          rs.content.map((e: any,i:any) => {
            this.filteredLopThi.push({
              ...e,
              view: ` ${e.name}`,
            })
              if (rs.content?.length === i + 1) {
              this.dsLopThi = this.filteredLopThi;
          }
          });
         
          console.log(this.filteredLopThi)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lấy dữ liệu thành công' });
        },
        error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });

        }
      )
  }
}
