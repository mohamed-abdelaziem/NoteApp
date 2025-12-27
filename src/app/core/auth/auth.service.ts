import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { EndPoint } from '../base/endPoint';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private _http = inject(HttpClient);
isLoadedUser = signal<boolean>(false);

// login fn
login(data : any):Observable<any>{
return this._http.post(`${EndPoint.endPoint}/users/signIn`, data)
}



register(data : any){
return this._http.post(`${EndPoint.endPoint}/users/signUp` , data);
}



}
