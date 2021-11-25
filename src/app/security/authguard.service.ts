import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor(private router:Router,
              private apiauthservice:ApiauthService) { }

  canActivate(route:ActivatedRouteSnapshot){
    const user=this.apiauthservice.userData;
    
    if (user) {
      return true;
    }   
    this.router.navigate(['/login']);
    return false;
  }
}
