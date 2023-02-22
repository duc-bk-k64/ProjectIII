import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { BaseClass } from 'src/app/BaseClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { StudentService} from 'src/app/app-management/service/student.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogAddStudentComponent } from '../dialog-add-student/dialog-add-student.component';
@Component({
  selector: 'app-examclass-detail',
  templateUrl: './examclass-detail.component.html',
  styleUrls: ['./examclass-detail.component.scss']
})
export class ExamclassDetailComponent extends BaseClass implements OnInit  {
  header: any;
  listQs:any[]=[];
  listQsSelected:any[]=[];
  listSV:any[]=[];
  listSVSelected:any[]=[];
  loading:boolean = true;
  constructor(public service: ExamClassService,public serviceSV: StudentService, private httpClient: HttpClient, private router: Router, private messageService: MessageService,
    private authService: AuthService,private route: ActivatedRoute,public dialogService: DialogService) { super();}

  ngOnInit(): void {
    this.getList(this.route.snapshot.params['id']),
    this.getListSV(this.route.snapshot.params['id'])
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION, this.authService.getToken());
  }
  getList(id:any){  
    this.service.getListQs(id).pipe(this.unsubsribeOnDestroy)
    .subscribe(
      (rs: any) => {
        this.loading = false;
        console.log(rs)
       this.listQs=rs
        
      },
    )
    this.loading = true}
    deleteQs(item: any) {

      this.service.deleteQs(item.id).pipe(this.unsubsribeOnDestroy)
        .subscribe(
          (rs: any) => {
            console.log(rs.status)
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công' });
          },
          error => {
            console.log(error)
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
          }
          
        )
    }
    getListSV(id:any){
      this.serviceSV.getListSV(id).pipe(this.unsubsribeOnDestroy)
    .subscribe(
      
      (rs: any) => {
        this.loading = false;
        console.log(rs)
        
       this.listSV=rs
        
      },
    )
    this.loading = true
    }
    openDialogAdd() {
      let item: any = {
        fullname: "",
        studentCode:""
      };
      item = JSON.parse(JSON.stringify(item));
      const dialogRef = this.dialogService.open(DialogAddStudentComponent, {
          width: '1200px',
          height: '65vh',
        
          data: {
              item
          }
      });
      dialogRef.onClose.subscribe(() => {
              
      });
  }
}
