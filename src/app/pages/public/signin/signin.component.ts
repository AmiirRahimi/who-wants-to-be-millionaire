import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  public formGroup!: FormGroup
  public showValidation: boolean = false
  public validationText!: string

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
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

  async loginUser(){
    const user = await this._authService.loginUser(this.formGroup.value)
    if (user.status != 409 && user.status != 404) {
      this._router.navigate(['../private/questions'], {relativeTo: this._route})
      localStorage.setItem('token', user)
    }else{
      this.showValidation = true
      setTimeout(() => {
        this.showValidation = false
      }, 2000);
    }
    if (user.status === 404) {
      this.validationText = 'Username or password is wrong'
    }
    if (user.status === 409) {
      this.validationText = 'User not found'
    }
  }
}
