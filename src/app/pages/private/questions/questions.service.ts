import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService } from '../../../shared/services/base-services/base-services'
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';
import { SubscriptionService } from 'src/app/shared/services/other-services/subscription.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends HttpBaseService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    private _subscriptionService: SubscriptionService
  ) {
    super();
  }

  getQuestions(): Observable<any>{
    return this._http.get(`${this._apiUrl}/questions`)
  }

  async updateUserScore(updateInfo: any){
    const user = await this._authService.getUser()
    this._http.patch(`${this._apiUrl}/user/${user.id}`, updateInfo).subscribe(res => {
      this._subscriptionService.setSubject(true)
    })
  }
}
