import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base/base.service';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class SubjectService extends BaseService{

    private sharedHeaders = new HttpHeaders();

    constructor(private _http: HttpClient, private authService: AuthService) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(storageKey.AUTHORIZATION,this.authService.getToken());
    }

    getListSubjects() {
        return this._http
        .get<any>(`/api/subjects?page=0&size=1000`, {
            headers: this.sharedHeaders,
        }) 
    }

    addSubject(body: any){
        return this._http
        .post<any>(`/api/subjects`, body, {
            headers: this.sharedHeaders,
        });
    }

    updateSubject(id: any, body: any) {
        return this._http.put(`/api/subjects/${id}`, body, {
            headers: this.sharedHeaders
        });
    }

    deleteSubject(id: any) {
        return this._http.delete(`/api/subjects/${id}`, {
            headers: this.sharedHeaders
        });
    }
}