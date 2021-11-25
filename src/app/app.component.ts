import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { ApiauthService } from './services/apiauth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'frontSisInvestigacion';
  user:User;
  rol:number;

  constructor (public apiauthService:ApiauthService,
               private router:Router){
                this.apiauthService.user.subscribe(res=>{
                  this.user=res;
                  this.rol=res.rol;                            
                }) ;              
               }

            
              // console.log(idrol);
 ngOnInit(): void {
  this.rol=this.apiauthService.userData.rol;
  console.log ('init rol',this.rol);
  
  //ser=this.apiauthService.userData;
 }
logout(){
  this.apiauthService.logout();
  this.router.navigate(['/login']);
}
    
}
