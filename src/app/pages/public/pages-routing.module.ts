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
        redirectTo: 'questions',
        pathMatch: 'full'
      },
      {
        path: 'questions',
        loadChildren: () => import('./signin-signup/signin-signup.module').then((m) => m.SigninSignupModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
