import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
  public userScores: any
  public showUserScores: boolean = false

  constructor(
    private _authService: AuthService,
    private _subscriptionService: SubscriptionService,
    private _route: ActivatedRoute,
    private _router: Router
    ){}

  ngOnInit(): void {
    this.getUsersScore()
    this.token = localStorage.getItem('token')!
    this.getUserScores()
  }

  getUserScores(){
    this._route.queryParams.subscribe((res:any) => {
      this.showUserScores = true
      this.userScores = res
    })
  }

  getUsersScore(){
    this._subscriptionService.getSubject().subscribe(res => {
      this._authService.getUsers().subscribe((res:any) => {
        this.users = res.sort((a:any,b:any) => b.score.totalScore - a.score.totalScore)
      })
    })
  }

  logout(){
    localStorage.clear()
    this.token = null
  }
}
