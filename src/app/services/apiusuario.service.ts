import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '../models/response'
import { Usuario } from '../models/usuario';

const httpOption={
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiusuarioService {

  url:string='http://localhost:13569/api/Usuario';
  
  constructor(
    private _http:HttpClient
  ) { }

getUsuarios():Observable<Response>{
  return this._http.get<Response>(this.url);
}

add(_usuario: Usuario):Observable<Response>{
  return this._http.post<Response>(this.url, _usuario,httpOption);
}
edit(_usuario: Usuario):Observable<Response>{
  return this._http.put<Response>(this.url, _usuario,httpOption);
}
delete(id: number):Observable<Response>{
  return this._http.delete<Response>(`${this.url}/${id}`);
}



getUserByRol(rol:number):Observable<Response>{
  return this._http.get<Response>(`${this.url}/${rol}`);
}
}
