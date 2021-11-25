import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ApiauthService } from '../services/apiauth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private apiauthService:ApiauthService){}
    intercept(request:HttpRequest<any>, next:HttpHandler){
        const user=this.apiauthService.userData;
        if (user){
            request=request.clone({
                setHeaders:{
                    Authorization:`Bearer ${user.token}`
                }
            });
        }
        return next.handle(request);
    }
}