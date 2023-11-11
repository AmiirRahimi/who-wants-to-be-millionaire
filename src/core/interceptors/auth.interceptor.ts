import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, Subscription, filter, first, map, mergeMap, of, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/other-services/authorization.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private _tokenChange: BehaviorSubject<any> = new BehaviorSubject(false)
  private _requests: Array<any> = []
  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    ) {}

  setTokenChange(value: any){
    this._tokenChange.next(value)
  }

  getTokenChange(): Observable<any>{
    return this._tokenChange.asObservable()
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
    if (!this._isExemptFromValidation(request.url)) {
      if (this._authService.isUserAuthenticated('access')) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this._authService.getUserAuthToken()?.access_token}`,
          },
        });
        return next.handle(request)
      }else if(this._authService.isUserAuthenticated('refresh')){
        return this._authService.updateAccessToken().pipe(first(), mergeMap((res:any) => {
          if (!res.hasError) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${res.resVal.access_token}`,
              },
            });
            return next.handle(request);
          }else{ 
            return res
          }
        }))
      }else{
        return next.handle(request);
      }
    }else{
      return next.handle(request)
    }
  }

  private _isExemptFromValidation(url: string): boolean {
    const exemptUrls = ['/update-access-token', 'sign-in', 'sign-up'];
    return exemptUrls.some((exemptUrl) => url.includes(exemptUrl));
  }
}
