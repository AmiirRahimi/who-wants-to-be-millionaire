import { Component, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public questions!: Array<any>
  public userQuestionsIds: Array<number> = []
  public userQuestions: Array<any> = []
  public questionNumberIndex: number = -1
  public totalOfCurrentQuestion: number= 0

  constructor(
    private _questionService: QuestionsService,
  ){}

  ngOnInit(): void {
    this.getQuestions()
  }

  // check answers for total of answer points
  checkAnswer(answers: any){
    this.totalOfCurrentQuestion = 0
    answers.forEach((answer: any) => {
      if (answer.isChecked === true && answer.isCorrect === true) {
        this.totalOfCurrentQuestion = this.totalOfCurrentQuestion + answer.value;
      }
      if (answer.isChecked === true && answer.isCorrect === false) {
        this.totalOfCurrentQuestion = this.totalOfCurrentQuestion - answer.value
      }
    })
  }

  // Fetch questions
  getQuestions(){
    this._questionService.getQuestions().subscribe(res => {
      this.questions = res
      this.chooseUserQuestions()
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
    if (this.questionNumberIndex < 4) {
      // this.questionNumberIndex ++
    }
    console.log(this.totalOfCurrentQuestion);
    
  }
}