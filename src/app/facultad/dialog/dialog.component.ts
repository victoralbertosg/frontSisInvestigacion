import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { ApifacultadService } from 'src/app/services/apifacultad.service';
import { Facultad } from 'src/app/models/facultad';
import { Especialidad } from 'src/app/models/especialidad';
import { TipoInvestigacionService } from 'src/app/services/tipo-investigacion.service';
import { Tipo_Investigacion } from 'src/app/models/tipo_investigacion';

@Component({
  selector: 'app-dialog',
  templateUrl: '../dialog/dialog.component.html',
  styleUrls: ['../dialog/dialog.component.css']
  
})
export class DialogComponent implements OnInit {
  public facultad:Facultad;  
  public especialidades:Especialidad[];
  public tipo_investigacion:Tipo_Investigacion[];
    
  
  public especialidadForm=this.formBuilder.group({
    descripcion:['',Validators.required]  
  })
  
  constructor(
    public dialogRef:MatDialogRef<DialogComponent>,
    public snackBar:MatSnackBar,
    private formBuilder:FormBuilder,
    public apiFacultad:ApifacultadService,
    public apiinv:TipoInvestigacionService) 
    {this.especialidades=[];
     this.facultad={descripcion:'',especialidades:[]}; 
      }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();    
  }

  addEspecialidad(){
    this.especialidades.push(this.especialidadForm.value);
    this.especialidadForm.reset();
 
  }
  addFacultad(){

    this.facultad.especialidades=this.especialidades;
    console.log (this.especialidades);
    console.log (this.facultad);
    this.apiFacultad.add(this.facultad).subscribe(response=>{
      if (response.exito===1){
        this.dialogRef.close();
        this.snackBar.open('facultad guardado','',{
          duration:2000
        });
      }
    });
  }
}
