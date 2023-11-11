
import { Injectable } from "@angular/core";
import { HttpBaseService } from "../base-services/base-services";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AuthorizationService extends HttpBaseService {

    constructor(
     private _http: HttpClient
    ){
     super()
    }

    createAccount(loginInfo: any){
     return this._http.post(`${this._apiUrl}/user`, loginInfo)
    }

}