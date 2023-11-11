import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children:[
      {
        path: '',
        redirectTo: 'questions',
        pathMatch: 'full'
      },
      {
        path: 'questions',
        loadChildren: () => import('./questions/questions.module').then((m) => m.QuestionsModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
