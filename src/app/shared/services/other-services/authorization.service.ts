
import { Injectable } from "@angular/core";
import { HttpBaseService } from "../base-services/base-services";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService extends HttpBaseService {

    constructor(
     private _http: HttpClient
    ){
     super()
    }

    createAccount(signUpInfo: any){
        return this.checkUser(signUpInfo.email).pipe(map((isExist: boolean) => {
            if (isExist) {
                this._http.post(`${this._apiUrl}/user`, signUpInfo).subscribe(res => {
                    console.log(res);
                    
                })
                return {status: 201}
            }else{
                return {status: 409}
            }
        }))
    }

    loginUser(loginInfo: any){
        return this.checkUser(loginInfo.email).pipe(map((isExist: boolean) => {
            if (isExist) {
                return {status: 201}
            }else{
                return {status: 409}
            }
        }))
    }

    getUsers(){
     return this._http.get(`${this._apiUrl}/user`)
    }

    checkUser(email: string){
        let result : boolean = false
        let emails: Array<string> = []
        return this.getUsers().pipe(map((res:any) => {
          res.forEach((user: any) => {
            emails.push(user.email)
          })
          if (emails.includes(email)) {
            result = false
          }else{
            result = true
          }
          return result
        }))
      }

}