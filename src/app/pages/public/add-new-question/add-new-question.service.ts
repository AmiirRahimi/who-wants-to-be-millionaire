import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/services/base-services/base-services';

@Injectable({
  providedIn: 'root'
})
export class AddNewQuestionService extends HttpBaseService {

  constructor(
    private _http: HttpClient
  ) {
    super()
  }

  addNewQuestion(newQuestion: any){
    return this._http.post(`${this._apiUrl}/questions`, newQuestion)

  }
}
