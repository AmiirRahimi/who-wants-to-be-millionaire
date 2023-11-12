import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public users: any
  constructor(private _authService: AuthService){}

  ngOnInit(): void {
    this.getUsersScore()
  }

  getUsersScore(){
    this._authService.getUsers().subscribe(res => {
      this.users = res
    })
  }
}
