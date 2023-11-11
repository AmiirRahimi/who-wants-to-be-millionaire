import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.scss']
})
export class SigninSignupComponent implements OnInit {

  public formGroup!: FormGroup

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
  ){}

  ngOnInit(): void {
    this.initForm()
  }


  initForm(){
    this.formGroup = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  registerUser(){
    this._authService.createAccount(this.formGroup.value).subscribe(res => {
      console.log(res);
      
    })
  }
}
