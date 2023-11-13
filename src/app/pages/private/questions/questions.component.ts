import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';

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
    private _authService: AuthService,
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
    while(selectedNumber > 39){
      selectedNumber = this.generateNumber()
    }
    if (!this.userQuestionsIds.includes(selectedNumber)) {
      this.userQuestionsIds.push(selectedNumber)
    }
  }

  generateNumber(){
    return Math.floor(Math.random() * 100) + 1;
  }

  // go to next question
  async nextQuestion(){
    const user = await this._authService.getUser()
    let totalScore = 0
    if (user.score.totalScore) {
      totalScore = user.score.totalScore
    }
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
          this._questionService.updateUserScore({score: {currentScore: this.totalOfCurrentGame,totalScore: totalScore + this.totalOfCurrentGame,timeStamp: Date.now()}})
          this._router.navigate([''])
        }
      },1500);
    }else{
      this.noneAnswerValidation = true
    }
  }

  updateUserScore(){

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
