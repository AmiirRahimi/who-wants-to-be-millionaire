import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children:[
      {
        path: '',
        redirectTo: 'results',
        pathMatch: 'full'
      },
      {
        path: 'signUp',
        loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule),
        canActivate:[LoginGuard]
      },
      {
        path: 'signIn',
        loadChildren: () => import('./signin/signin.module').then((m) => m.SigninModule),
        canActivate:[LoginGuard]
      },
      {
        path: 'results',
        loadChildren: () => import('./results/results.module').then((m) => m.ResultsModule)
      },
      {
        path: 'add-new',
        loadChildren: () => import('./add-new-question/add-new-question.component').then((m) => m.AddNewQuestionComponent)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
