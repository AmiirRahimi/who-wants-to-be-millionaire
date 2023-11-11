import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninSignupComponent } from './signin-signup.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: '',
  component: SigninSignupComponent
}
]

@NgModule({
  declarations: [SigninSignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SigninSignupModule { }
