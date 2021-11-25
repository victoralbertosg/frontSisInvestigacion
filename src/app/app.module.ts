import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';


import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

//import {MatTableDataSource} from '@angular/material/table';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DialogusuarioComponent } from './usuario/dialog/dialogusuario.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeleteComponent } from './common/delete/delete.component';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { FacultadComponent } from './facultad/facultad.component';
import { DialogComponent } from './facultad/dialog/dialog.component';
import { DialogProyectoComponent } from './proyecto/dialog/dialogProyecto.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DialogEnviarComponent } from './proyecto/dialog-enviar/dialog-enviar.component';
import { DialogEvaluarComponent } from './proyecto/dialog-evaluar/dialog-evaluar.component';
import { DatePipe } from '@angular/common';
import { DialogVerComponent } from './proyecto/dialog-ver/dialog-ver.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsuarioComponent,
    DialogusuarioComponent,
    DeleteComponent,
    LoginComponent,
    FacultadComponent,
    DialogComponent,
    DialogProyectoComponent,
    ProyectoComponent,
    DialogEnviarComponent,
    DialogEvaluarComponent,
    DialogVerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
 //   MatTableDataSource,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatRadioModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
 
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true},DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
