import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public formGroup!: FormGroup
  public showValidation: boolean = false

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

  async registerUser(){
    const newUser = await this._authService.createAccount(this.formGroup.value)
    console.log(newUser);
    
    if (newUser) {
      switch (newUser.status) {
            case 201:
              localStorage.setItem('token', newUser.token)
              this._router.navigate(['../private/questions'], {relativeTo: this._route})
              break;
            case 409:
              this.showValidation = true
              setTimeout(()=> {
                this.showValidation = false
              }, 2000)
              break;
          }
    }
  }
}
