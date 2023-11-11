import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninSignupComponent } from './signin-signup/signin-signup.component';
import { PrivateRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [
    SigninSignupComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ]
})
export class PublicModule { }
