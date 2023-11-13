import { Component, OnInit } from '@angular/core';
import { AddNewQuestionService } from './add-new-question.service';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.scss']
})
export class AddNewQuestionComponent implements OnInit {

  public newQuestion: any
  public noneAnswerValidation: boolean = false
  public addSuccess: boolean = false
  public totalPoint: number = 0

  constructor(
    private _addNewQuestionService: AddNewQuestionService
  ){}

  ngOnInit(): void {
    this.newQuestion = this.noneNewQuestion()
  }

  noneNewQuestion(){
    return {
      title: '',
      point: 0,
      answers: [
        {
          title: '',
          value: null,
          isCorrect: false
        },
        {
          title: '',
          value: null,
          isCorrect: false
        },
        {
          title: '',
          value: null,
          isCorrect: false
        },
        {
          title: '',
          value: null,
          isCorrect: false
        },
      ]
    }
  }

  checkForNoneAnswer(){
    let counter = 0
    let isCorrect = 0
    if (this.newQuestion.title.length == 0) {
      counter ++;
    }
    this.newQuestion.answers.forEach((answer: any) => {
      if (answer?.isCorrect) {
        isCorrect ++;
      }else{
        answer.value = -5
      }
      if (answer.value == 0 && answer.isCorrect) {
        counter ++;
      }
    })
    if (isCorrect == 0) {
      counter ++
    }
    return counter
  }

  setValue(isCorrect: boolean, i: any){
    console.log(isCorrect);
    
    if (isCorrect == false) {
      this.newQuestion.answers[i].value = -5
    }else{
      this.newQuestion.answers[i].value = null
    }
    this.totalPointsOfQuestion()
  }

  totalPointsOfQuestion(){
    this.totalPoint = 0
    this.newQuestion.answers.forEach((res:any) => {
      if (res.isCorrect) {
        this.totalPoint += res.value
      }
    })
    this.newQuestion.point = this.totalPoint
  }

  limitInput(event: any, i: any): void {
    const value = Number(event.target.value)
    if (value > 20) {
      this.newQuestion.answers[i].value = 20
    }
    this.totalPointsOfQuestion()
  }

  saveQuestion(){
    this.noneAnswerValidation = false
    if (this.checkForNoneAnswer() > 0) {
      this.noneAnswerValidation = true
    }else{
      this.totalPointsOfQuestion()
      this._addNewQuestionService.addNewQuestion(this.newQuestion).subscribe(res => {
        this.newQuestion = this.noneNewQuestion()
        this.addSuccess = true;
        setTimeout(() => {
          this.addSuccess = false
        }, 1500);
      })
    }
  }

}
