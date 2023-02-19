import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base/base.service';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService{

    private sharedHeaders = new HttpHeaders();
    private subUrl: string = '/api/questions';

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

    getListQuestions() {
        return this._http
        .get<any>(`${this.subUrl}?page=0&size=1000`, {
            headers: this.sharedHeaders,
        }) 
    }

    addQuestion(body: any){
        return this._http
        .post<any>(`${this.subUrl}`, body, {
            headers: this.sharedHeaders,
        });
    }

    updateQuestion(id: any, body: any) {
        return this._http.patch(`${this.subUrl}/${id}`, body, {
            headers: this.sharedHeaders
        });
    }

    deleteQuestion(id: any) {
        return this._http.delete(`${this.subUrl}/${id}`, {
            headers: this.sharedHeaders
        });
    }

    getById(id: any) {
        return this._http.get(`${this.subUrl}/${id}`, {
            headers: this.sharedHeaders
        });
    }
}