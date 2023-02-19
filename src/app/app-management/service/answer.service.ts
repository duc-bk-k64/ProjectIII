import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base/base.service';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AnswerService extends BaseService{

    private sharedHeaders = new HttpHeaders();
    private subUrl: string = '/api/answers';

    constructor(private _http: HttpClient, private authService: AuthService) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(storageKey.AUTHORIZATION,this.authService.getToken());
    }

    getListAnswers() {
        return this._http
        .get<any>(`${this.subUrl}?page=0&size=1000`, {
            headers: this.sharedHeaders,
        }) 
    }

    addAnswer(body: any){
        return this._http
        .post<any>(`${this.subUrl}`, body, {
            headers: this.sharedHeaders,
        });
    }

    updateAnswer(id: any, body: any) {
        return this._http.patch(`${this.subUrl}/${id}`, body, {
            headers: this.sharedHeaders
        });
    }

    deleteAnswer(id: any) {
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