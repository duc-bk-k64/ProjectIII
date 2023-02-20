import { DataUpdateAccount } from './../../../Model/DataUpdateAccount';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { async } from 'rxjs';
import { Account } from 'src/app/app-management/Model/Account';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html'
})
export class AccountManagementComponent implements OnInit {

  constructor(private authService: AuthService,private httpClient: HttpClient,private router: Router,private messageService: MessageService) { }
  @ViewChild('dt1') dt1: Table | undefined;
  @ViewChild('dt2') dt2: Table | undefined;

  ngOnInit(): void {
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.loadAccount();

  }
  statusList = [{
    'name':'True',
    'value':true
  },
  {
    'name':'False',
    'value':false
  }
]
  roleList = ["ADMIN","TEACHER","STUDENT"]
  header: any;
  listAccount: any[] = [];
  listAccountStudent: any[] = [];
  listAccountAdminAndTeacher: any[] = [];
  accountStudentSelected: any[] = [];
  accountAdminAndTeacherSelected: any[] = [];
  showCreateDialog: boolean = false;
  showUpdateDialog: boolean = false;
  labelCreate = "Tạo mới tài khoản";
  labelUpdate =  "Cập nhật tài khoản";
  accountUpdate: Account = {};
  dataUpdate: DataUpdateAccount = {
  }
  loading:boolean = true;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  applyFilterGlobal2($event: any, stringVal: any) {
    this.dt2!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
 async loadAccount() {
  this.listAccountStudent = [];
  this.listAccountAdminAndTeacher = [];
  this.loading = true;
     await this.httpClient.get<any>("/api/account-systems?page=0&size=100",{headers: this.header}).toPromise().then(data => {
      try {
        this.listAccount=data.content;
     } catch (error) {
         this.messageService.add({severity:data.title, summary:data.detail});
     }

     },
     error => {
      this.router.navigate(['/auth/error']);
     }
     );
     for(let i=0; i<this.listAccount.length; i++) {
      if(this.listAccount[i].roles == "STUDENT") this.listAccountStudent.push(this.listAccount[i]);
      else this.listAccountAdminAndTeacher.push(this.listAccount[i]);
     }
     this.loading = false;

  }
  showCreateDialogFunc() {
    this.showCreateDialog = true;
  }
  cancelCreateDialog() {
    this.showCreateDialog = false
  }
  showUpdateDialogFunc(obj: any) {
    this.showUpdateDialog = true;
    this.accountUpdate = obj;
    // console.log(this.accountUpdate);
  }
  cancelUpdateDialog() {
    this.showUpdateDialog = false
    this.accountUpdate = {}
  }
  async updateAccount() {
    this.loading = true;
    this.dataUpdate.email=this.accountUpdate.email;
    this.dataUpdate.note = this.accountUpdate.note;
    this.dataUpdate.roles = this.accountUpdate.roles;
    this.dataUpdate.status = this.accountUpdate.status
   await this.httpClient.put<any>("/api/account-systems/"+this.accountUpdate.id,this.dataUpdate,{headers: this.header}).toPromise().then(data => {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Cập nhật thành công'});
    // console.log(data)
   },
   error => {
    console.log(error)
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Có lỗi xảy ra'});
    // this.router.navigate(['/auth/error']);
   }

   )
   this.loading  = false;
  //  console.log("update");
   this.loadAccount();
   this.showUpdateDialog = false;
  }


}
