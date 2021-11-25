import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiauthService } from '../services/apiauth.service';
import { Router } from '@angular/router';
import {FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() rol = new EventEmitter();

public loginForm=this.formBuilder.group({
idusuario:['',Validators.required],
password:['',Validators.required]
});


  constructor(public apiauthService: ApiauthService,
              private router:Router,
              private formBuilder:FormBuilder)               
              { 
               /* if (this.apiauthService.userData){
                  this.router.navigate(['/']);
                }*/
              }

  ngOnInit(): void {
  }

  login(){
    this.apiauthService.login(this.loginForm.value).subscribe(response=>{
      if (response.exito===1){
       // this.router.navigate(['/principal']);

        this.router.navigate(['/']);
        this.rol.emit(response.data);
      }
      console.log('res login',response.data);
    });
  }
  
  
}
