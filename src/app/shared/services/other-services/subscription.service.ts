
import { Injectable } from "@angular/core";
import { HttpBaseService } from "../base-services/base-services";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, lastValueFrom, map } from "rxjs";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class SubscriptionService{

    private subject: BehaviorSubject<boolean> = new BehaviorSubject(false)

    constructor(){}

    setSubject(value: any){
     this.subject.next(value)
    }

    getSubject(){
     return this.subject.asObservable()
    }
   }