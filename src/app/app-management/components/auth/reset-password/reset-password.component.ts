import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  constructor(private httpClient: HttpClient,private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
  }
  code:any;
  newPassword:any;
  loading:boolean = false;
  async resetPassword() {
    this.loading = true;
    await this.httpClient.post<any>("/api/reset-password/finish",{"key":this.code,"newPassword":this.newPassword}).toPromise().then(
      data => {
        this.messageService.add({severity:"success", summary:"Reset password successfully"});
        setTimeout( () => {
          this.router.navigate(['/auth/login'])
        }, 2000 );
      },
      error => {
        console.log(error)
        this.messageService.add({severity:"error", summary:error.error.title});
      }
    )
    this.loading = false;

  }


}
