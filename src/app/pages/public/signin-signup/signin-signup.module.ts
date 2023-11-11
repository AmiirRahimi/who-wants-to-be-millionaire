import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninSignupComponent } from './signin-signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';
import { HttpClientModule } from '@angular/common/http';

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
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[AuthService]
})
export class SigninSignupModule { }
