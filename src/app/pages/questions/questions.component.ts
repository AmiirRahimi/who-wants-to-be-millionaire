import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(
    private _questionService: QuestionsService
  ){}

  ngOnInit(): void {
    this.getQuestions()
  }

  getQuestions(){
    this._questionService.getQuestions().subscribe(res => {
      
    })
  }
}
