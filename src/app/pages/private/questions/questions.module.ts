import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { QuestionsService } from './questions.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';



const routes: Routes = [
  {
    path: '',
    component: QuestionsComponent
  }
]

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers:[QuestionsService, AuthService]
})
export class QuestionsModule { }
