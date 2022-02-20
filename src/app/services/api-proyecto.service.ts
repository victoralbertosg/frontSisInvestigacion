import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {Response} from '../models/response'
import { ApiauthService } from './apiauth.service';
import { Observable } from 'rxjs';
import { filter, map, flatMap } from 'rxjs/operators';
import { Proyecto } from '../models/proyecto';
import { environment } from 'src/environments/environment';
const httpOptions={
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
  };
@Injectable({
  providedIn: 'root'
})
export class ApiProyectoServiceService {

constructor(private _http:HttpClient) { }

//url:string= 'http://localhost:13569/api/proyecto';
url:string= `${environment.urlPrincipal}/api/proyecto`;
//url1:string='http://localhost:13569/api/proyecto/asesor';
url1:string=`${environment.urlPrincipal}/api/proyecto/asesor`;
url2:string=`${environment.urlPrincipal}/api/proyecto/user`;
urls:string;

getallByUser(id: number):Observable<Response>{
  return this._http.get<Response>(`${this.url}/${id}`)
}

getallByUserByEtapa(id: number, etapaP:number):Observable<Response>{  
  if (etapaP==1 || etapaP==2){
      this.urls=this.url2;
  }
    else if (etapaP==3) {
      this.urls=this.url1;
    }else if (etapaP==5 || etapaP==7){
      this.urls=this.url;
      return this._http.get<Response>(`${this.urls}`).pipe(
        map(res=>
          res.data.filter((rf:any)=>rf.etapa===etapaP)
      )
      )
    }
    
    
     
  return this._http.get<Response>(`${this.urls}/${id}`).pipe(
    map(res=>
      res.data.filter((rf:any)=>rf.etapa===etapaP)
  )
  )
}


getByTrabInv(id:number):Observable<Response>{
    return this._http.get<Response>(`${this.url}/trabinv/${id}`)
} 


/*getSelectedThemeThreads(theme: string): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.threadsUrl).pipe(
      map(result =>
        result.filter(one => one.theme === theme)
      )
    )
  }*/


/*getSelectedThemeThreads(theme: string): Observable<Flower[]> {
    return this.http.get<Flower[]>(this.threadsUrl).pipe(
      map(result =>
        result.filter(one => one.theme === theme)
      )
    )
  }
*/

  /*getSelectedThemeThreads(): Observable<Thread[]> {
        return this.http.get<Thread[]>(this.threadsUrl).pipe(
          map(threads => threads),
          filter(thread => thread.theme.id === theme.id)
        );
      }*/



add(proyecto:Proyecto):Observable<Response>{
  console.log('urldelService',this.url);
  return this._http.post<Response>(this.url,proyecto,httpOptions);
}

edit(proyecto:Proyecto):Observable<Response>{
  return this._http.put<Response>(this.url,proyecto,httpOptions);
}

}
