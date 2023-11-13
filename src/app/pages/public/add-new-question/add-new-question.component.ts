import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-question',
  templateUrl: './add-new-question.component.html',
  styleUrls: ['./add-new-question.component.scss']
})
export class AddNewQuestionComponent {

  public newQuestion: any = {
    title: '',
    point: 0,
    answers: [
      {
        title: '',
        value: 0,
        isCorrect: false
      },
      {
        title: '',
        value: 0,
        isCorrect: false
      },
      {
        title: '',
        value: 0,
        isCorrect: false
      },
      {
        title: '',
        value: 0,
        isCorrect: false
      },
    ]
  }

}
