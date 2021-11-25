import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reginv } from '../models/registroInv';
import {Response} from '../models/response';


const httpOption={
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiRegInvService {

  url:string='http://localhost:13569/api/RegInv';

  constructor(private _http:HttpClient) { }

  add(regInv: Reginv):Observable<Response>{
    return this._http.post<Response>(this.url, regInv,httpOption);
  }

  getRegByIdinv(id:number):Observable<Response>{
    return this._http.get<Response>(`${this.url}/${id}`);
  }

}
