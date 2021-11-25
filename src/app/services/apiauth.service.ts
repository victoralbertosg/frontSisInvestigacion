import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import {map } from 'rxjs/operators';
import {Response} from '../models/response';
import { Login } from '../models/login';
const httOption={
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiauthService {
url:string='http://localhost:13569/api/User/login';

private userSubject:BehaviorSubject<User>;
public user:Observable<User>;

public get userData():User{
  return this.userSubject.value;
}

constructor(private _http: HttpClient) { 
  this.userSubject =  
  new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  this.user=this.userSubject.asObservable();
}


login(login:Login): Observable<Response>{ 
  return this._http.post<Response>(this.url, login, httOption).pipe(    
    map(res => {
        if (res.exito===1){
          const user:User=res.data;
          localStorage.setItem('user',JSON.stringify(user));
          this.userSubject.next(user);
        }
        return res;
    }
    )
  );
}

logout(){
  localStorage.removeItem('user') ;
  this.userSubject.next(null);
}

}  


