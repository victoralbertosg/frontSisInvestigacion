import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiauthService } from 'src/app/services/apiauth.service';
import { ApiProyectoServiceService } from 'src/app/services/api-proyecto.service';
import { Reginv } from 'src/app/models/registroInv';
import { ApiRegInvService } from 'src/app/services/api-reg-inv.service';
import { Proyecto } from 'src/app/models/proyecto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-evaluar',
  templateUrl: './dialog-evaluar.component.html',
  styles: [
  ]
})
export class DialogEvaluarComponent implements OnInit {

  rb:string;
  titulo:string=this.proy.titulo;
  asesor:string=this.proy.asesor;
  etapa:number;
  public proyByIdInv:Proyecto;

  public evaluacionForm=this.formBuilder.group({            
      observacion:['',Validators.required],    
})
  constructor(@Inject(MAT_DIALOG_DATA) public proy: any,  
  private formBuilder:FormBuilder,private authService:ApiauthService,
  private proyectoService:ApiProyectoServiceService, 
  private regInvService:ApiRegInvService,
  public snackBar:MatSnackBar,
  public dialogRef:MatDialogRef<DialogEvaluarComponent>,
  public datepipe: DatePipe ) { 
  
  }

  ngOnInit(): void {
    console.log(this.proy)
  }
  
  evaluar(){
      console.log('valor rb',this.rb);
      if (this.rb=='1'){
        this.etapa=this.proy.etapa+2;
      }else{
        //this.etapa=this.proy.etapa-1;
        this.etapa=2;
      }
      this.registrar(this.etapa);      
      //console.log('etapa',this.etapa);
  }
  close(){}


  registrar(etapa:number){
    
    let hoy=this.datepipe.transform(new Date(), 'yyyy-MM-dd');   
    const reginv: Reginv={idregInv:0,idtrabInvestigacion:this.proy.idtrab_investigacion,etapa:etapa, idusuario:this.authService.userData.idusuario, fecha:hoy,observaciones:this.evaluacionForm.value.observacion};          
    this.regInvService.add(reginv).subscribe(response=>{
    //if (response.exito===1){
       
     // }
     this.proyectoService.getByTrabInv(this.proy.idtrab_investigacion).subscribe(response=>{         
       this.proyByIdInv=response.data[0];
       this.proyByIdInv.etapa=etapa;
       //console.log('getbyproyecto',this.proyByIdInv);
       this.proyectoService.edit(this.proyByIdInv).subscribe(response=>{
         if (response.exito===1){
          this.dialogRef.close();
          this.snackBar.open('se registro correctamente','',{
            duration:2000
          });
          //this.getProyecto1(1);
         };
       })

     })  
      //console.log(reginv);
      //this.getProyecto1(1);
    }); 
  }
}
