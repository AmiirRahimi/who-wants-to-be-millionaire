import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';
import { count } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public questions!: Array<any>
  public userQuestionsIds: Array<number> = []
  public userQuestions: Array<any> = []
  public questionNumberIndex: number = 0
  public totalOfCurrentGame: number= 0
  public totalOfValues: number = 0
  public noneAnswerValidation: boolean = false
  public showAnswerCorrection: boolean = false

  constructor(
    private _questionService: QuestionsService,
    private _router: Router,
    private _route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getQuestions()
  }

  calculateTotalOfValues(){
    this.totalOfValues = 0
    this.userQuestions.forEach(question => {
      this.totalOfValues += question.points
    })
  }

  // check answers for total of answer points
  calculateTotalPoint(){
    this.userQuestions.forEach(question => {
      let pointOfEveryQuestion: number = 0
      question.answers.forEach((answer:any) => {
        if (answer.isCorrect && answer.isChecked) {
          pointOfEveryQuestion += answer.value
        }
        if (!answer.isCorrect && answer.isChecked) {
          pointOfEveryQuestion -= answer.value
        }
      })
      this.totalOfCurrentGame += pointOfEveryQuestion
    })
    console.log(this.totalOfCurrentGame);
    
  }

  // Fetch questions
  getQuestions(){
    this._questionService.getQuestions().subscribe(res => {
      this.questions = res
      this.chooseUserQuestions()
      this.calculateTotalOfValues()
    })
  }

  // Select questions for user
  chooseUserQuestions(){
    while(this.userQuestionsIds.length < 5){
      this.addQuestionId()
    }
    this.userQuestionsIds.forEach(id => {
      this.userQuestions.push(this.questions[id])
    })
    console.log(this.userQuestions);
    
  }

  addQuestionId(){
    let selectedNumber = this.generateNumber()
    while(selectedNumber > 40){
      selectedNumber = this.generateNumber()
    }
    if (!this.userQuestionsIds.includes(selectedNumber)) {
      this.userQuestionsIds.push(selectedNumber)
    }
  }

  generateNumber(){
    return Math.floor(Math.random() * 100);
  }

  // go to next question
  nextQuestion(){
    if (this.checkForNoneAnswer() != 0) {
      this.noneAnswerValidation = false
      this.showAnswerCorrection = true
      setTimeout(() => {
        this.showAnswerCorrection = false
        if (this.questionNumberIndex < 5) {
          this.questionNumberIndex ++
        }
        if (this.questionNumberIndex == 5) {
          this.calculateTotalPoint()
          this._router.navigate([''])
        }
      },2000);
    }else{
      this.noneAnswerValidation = true
    }
  }

  checkForNoneAnswer(){
    let counter = 0
    this.userQuestions[this.questionNumberIndex].answers.forEach((answer: any) => {
      if (answer?.isChecked === true) {
        counter ++;
      }
    })
    return counter
  }
}
