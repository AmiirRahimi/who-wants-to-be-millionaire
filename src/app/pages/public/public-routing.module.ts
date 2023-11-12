import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

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
        loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule)
      },
      {
        path: 'signIn',
        loadChildren: () => import('./signin/signin.module').then((m) => m.SigninModule)
      },
      {
        path: 'results',
        loadChildren: () => import('./results/results.module').then((m) => m.ResultsModule)
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
