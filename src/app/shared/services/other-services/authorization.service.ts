
import { Injectable } from "@angular/core";
import { HttpBaseService } from "../base-services/base-services";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AuthService extends HttpBaseService {

    constructor(
     private _http: HttpClient
    ){
     super()
    }

    createAccount(loginInfo: any){
     return this._http.post(`${this._apiUrl}/user`, loginInfo)
    }

    getUsers(){
     return this._http.get(`${this._apiUrl}/user`)
    }

}