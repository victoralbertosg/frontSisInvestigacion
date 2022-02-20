import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Facultad } from '../models/facultad';
import { Observable } from 'rxjs';
import {Response} from '../models/response';
import { environment } from 'src/environments/environment';
const httpOptions={
headers: new HttpHeaders({
  'Content-Type':'application/json'
})
};


@Injectable({
  providedIn: 'root'
})
export class ApifacultadService {

  //url:string= 'http://localhost:13569/api/facultad';
  url:string=`${environment.urlPrincipal}/api/facultad`;
  constructor(
    private _http:HttpClient
  ) { }

  add(facultad:Facultad):Observable<Response>{
    return this._http.post<Response>(this.url,facultad,httpOptions);
  }
}
