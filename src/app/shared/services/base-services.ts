
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class HttpBaseService {

    protected _apiUrl!:string;

    constructor(){
      this._apiUrl = `${environment.apiUrl}`
    }

}