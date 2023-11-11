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
        path: 'auth',
        loadChildren: () => import('./signin-signup/signin-signup.module').then((m) => m.SigninSignupModule)
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
