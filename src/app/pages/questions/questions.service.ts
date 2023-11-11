import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../../shared/services/base-services'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends HttpBaseService {

  constructor(
    private _http: HttpClient
  ) {
    super();
  }

  getQuestions(): Observable<any>{
    return this._http.get(`${this._apiUrl}/questions`)
  }
}
