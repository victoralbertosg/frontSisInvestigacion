import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Response} from '../models/response';
import { environment } from 'src/environments/environment';


const httpOption={
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class TipoInvestigacionService {

  //url:string='http://localhost:13569/api/Tipo_Inv';
  url:string=`${environment.urlPrincipal}/api/Tipo_Inv`;
  constructor(
    private _http:HttpClient
  ) { }

  getUsuarios():Observable<Response>{
    return this._http.get<Response>(this.url);
  }
}
