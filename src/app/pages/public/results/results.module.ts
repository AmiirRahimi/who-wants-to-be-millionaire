import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results.component';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent
  }
]

@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers:[AuthService]
})
export class ResultsModule { }
