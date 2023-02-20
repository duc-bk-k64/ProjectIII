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
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddExamComponent } from './dialog-add-exam/dialog-add-exam.component';
import {DialogService} from 'primeng/dynamicdialog';
import {CardModule} from 'primeng/card';
import {CascadeSelectModule} from 'primeng/cascadeselect';
@Component({
  selector: 'app-examclass-management',
  templateUrl: './examclass-management.component.html',
  styleUrls: ['./examclass-management.component.scss']
})
export class ExamclassManagementComponent extends BaseClass implements OnInit {
  // filterExam: FormControl 
  header: any;

  listExam: any[] = [];
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ["name", "startTime", "endTime", "numberOfQuestion", "numberOfStudent"];
  dataTable: any = [];
  filterLopThi = new FormControl('');
  filteredLopThi: any = [];
  dsLopThi: any;
  constructor(public service: ExamClassService, private httpClient: HttpClient, private router: Router, private messageService: MessageService,
    private authService: AuthService,public dialog: MatDialog,public dialogService: DialogService
    ) {
    super()
  }

  ngOnInit(): void {
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION, this.authService.getToken());
    this.getList()
    this.filterLopThi.valueChanges.subscribe({
      next: (value) => {
          this.filteredLopThi = this.dsLopThi.filter(
          );
      }
  })
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhật thành công' });
        },
        error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });

        }
      )
  }
  openDialogAdd() {
    let item: any = {
      
      name: "",
      numberOfStudents: "",
      startTime: null,
      endTime: null,
      isComeBack: null,
      status: null,
      note: "",
      numberOfQuestions: "",
      easyQuestionRate: "",
      mediumQuestionRate: "",
      difficultQuestionRate: "",
      subjectId: 2,
      teacherId: 4
    };
    item = JSON.parse(JSON.stringify(item));
    const dialogRef = this.dialogService.open(DialogAddExamComponent, {
        width: '1200px',
        height: '65vh',
      
        data: {
            item
        }
    });
    dialogRef.onClose.subscribe(() => {
            this.getList();
    });
}
openDialogUpdate(element:any) {
  let item: any = {
    ...element,
  };
  console.log(item)
  item = JSON.parse(JSON.stringify(item));
  const dialogRef = this.dialogService.open(DialogAddExamComponent, {
      width: '1200px',
      height: '65vh',
    
      data: {
          item,
          id:element.id
      }
  });
  dialogRef.onClose.subscribe((response: any) => {
      if (response === true) {
          this.getList();
      }
  });
}
  deleteExam(item: any) {
    this.service.deleteExam(item.id).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (rs: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công' });
          
        },
        error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
        }
        
      )
      this.getList()
  }
  // async getDS() {
  //  await this.httpClient.get<any>("/api/exam-classes",{headers: this.header}).toPromise().then(data => {
  //   console.log(data)
  //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Cập nhật thành công'});
  //   // console.log(data)
  //  },
  //  error => {
  //   console.log(error)
  //   this.messageService.add({severity:'error', summary: 'Error', detail: 'Có lỗi xảy ra'});

  //  }
  //  )

  // }


}
