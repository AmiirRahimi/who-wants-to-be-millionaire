import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';
import { SubscriptionService } from 'src/app/shared/services/other-services/subscription.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public users: any
  public token!: string | null
  constructor(
    private _authService: AuthService,
    private _subscriptionService: SubscriptionService
    ){}

  ngOnInit(): void {
    this.getUsersScore()
    this.token = localStorage.getItem('token')!
  }

  getUsersScore(){
    this._subscriptionService.getSubject().subscribe(res => {
      this._authService.getUsers().subscribe(res => {
        this.users = res
      })
    })
  }

  logout(){
    localStorage.clear()
    this.token = null
  }
}
