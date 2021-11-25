import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AuthguardService } from './security/authguard.service';
import { LoginComponent } from './login/login.component';
import { FacultadComponent } from './facultad/facultad.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'',redirectTo: '/home', pathMatch:'full'},
  {path:'home',component:HomeComponent, canActivate:[AuthguardService]},
  {path:'usuario',component:UsuarioComponent, canActivate:[AuthguardService]},
  {path:'facultad',component:FacultadComponent, canActivate:[AuthguardService]},
  {path:'proyecto',component:ProyectoComponent, canActivate:[AuthguardService]},
  {path:'proyecto/:etapa',component:ProyectoComponent, canActivate:[AuthguardService]},
  {path:'login',component:LoginComponent},
  {path:'principal',component:AppComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
