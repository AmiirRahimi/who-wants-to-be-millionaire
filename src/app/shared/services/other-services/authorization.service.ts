
import { Injectable } from "@angular/core";
import { HttpBaseService } from "../base-services/base-services";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom, map } from "rxjs";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class AuthService extends HttpBaseService {

    constructor(
     public _http: HttpClient
    ){
     super()
    }

    async createAccount(signUpInfo: any){
        const user = await lastValueFrom(this.checkUser(signUpInfo.email).pipe(map(res => {
            return res
        })))
        console.log(user);
        if (user) {
            return {status: 409}
        }else{
            const newUser = await lastValueFrom(this._http.post(`${this._apiUrl}/user`, {...signUpInfo, token: this.generateToken(signUpInfo.email)}).pipe(map(res => {
                return res
            }))) as any
            newUser['status'] = 201
            return newUser;
        }
    }

    async loginUser(loginInfo: any){
        const token = await this.getUserToken(loginInfo)
        if (token != 409 && token != 404 ) {
            return token
        }
        if (token == 404) {
            return {status: 404}
        }
        if (token == 409) {
            return {status: 409}
        }
    }

    getUsers(){
     return this._http.get(`${this._apiUrl}/user`)
    }

    checkUser(email: string){
        let result!: boolean
        let emails: Array<string> = []
        return this.getUsers().pipe(map((res:any) => {
          res.forEach((user: any) => {
            emails.push(user.email)
          })
          if (emails.includes(email)) {
            result = true
          }else{
            result = false
          }
          return result
        }))
      }

      async getUserToken(loginInfo: any){
        const user = await lastValueFrom(this._http.get(`${this._apiUrl}/user?email=${loginInfo.email}`).pipe(map((res:any) => {
            return res[0]
        })))
        if (user && user.password === loginInfo.password) {
            return user.token
        }
        if (user && user.password != loginInfo.password) {
            return 404
        }
        if (!user) {
            return 409
        }

      }

      async getUser(){
        const token = localStorage.getItem('token')
        const user = await lastValueFrom(this._http.get(`${this._apiUrl}/user?token=${token}`).pipe(map((res:any) => {
            return res[0]
        })))
        return user
      }

      async validateToken(token: string){
        const user = await lastValueFrom(this._http.get(`${this._apiUrl}/user?token=${token}`).pipe(map((res:any) => {
            return res[0]
        })))
        if (user) {
            return {status: 200}
        }else{
            return {status: 409}
        }
      }

      generateToken(value: any){
        const hashedValue = CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
        return hashedValue
      }
}