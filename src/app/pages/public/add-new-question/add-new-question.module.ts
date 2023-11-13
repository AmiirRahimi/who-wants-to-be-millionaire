import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewQuestionComponent } from './add-new-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component:AddNewQuestionComponent
  }
]

@NgModule({
  declarations: [AddNewQuestionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AddNewQuestionModule { }
