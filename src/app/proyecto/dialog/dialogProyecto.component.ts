import { Component, OnInit, Inject } from '@angular/core';
import { ApiProyectoServiceService } from 'src/app/services/api-proyecto.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Proyecto } from 'src/app/models/proyecto';
import { Response } from 'src/app/models/response';
import { ApiauthService } from 'src/app/services/apiauth.service';
import { DatePipe } from '@angular/common';
import { TipoInvestigacionService } from 'src/app/services/tipo-investigacion.service';
import { Tipo_Investigacion } from 'src/app/models/tipo_investigacion';
import { ApiusuarioService } from 'src/app/services/apiusuario.service';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialogProyecto.component.html',
  styleUrls: ['./dialogProyecto.component.css']
})
export class DialogProyectoComponent implements OnInit {

  public  oproyecto:Proyecto;
  public tipo_inv:Tipo_Investigacion[];
  public lstUsuario:any[];
 
 
  invControl = new FormControl('', Validators.required);
 // asesorControl = new FormControl('', Validators.required);

 
  public proyectoForm=this.formBuilder.group({             
      titulo:['',Validators.required],
      urlInv:['',Validators.required],
      asesor:['',Validators.required],    
  })

   
  constructor(public apiProyecto: ApiProyectoServiceService,
    public dialogRef:MatDialogRef<DialogProyectoComponent>,    
    public snackBar:MatSnackBar,
    private formBuilder:FormBuilder,
    private authService:ApiauthService,
    public apitipo_inv:TipoInvestigacionService,
    public datepipe: DatePipe,
    public apiusuario:ApiusuarioService,
    @Inject(MAT_DIALOG_DATA) public proy: any,
    ){
      this.oproyecto= {idtrab_investigacion:0,idusuario:0 ,idasesor:0,idtipoInv:0, titulo:"",fecha:"", urlInv:"",etapa:0};
      this.gettipo_inv();   
      
      if (this.proy !==null){
          this.proyectoForm.patchValue({
          titulo:this.proy.titulo,
          urlInv:this.proy.url,
          asesor:this.proy.asesor,
        })
        console.log('mi proy',proy);
        console.log(this.proy.asesor);
       /* this.persona=_usuario.idpersona;
        this.especialidad=_usuario.idespecialidad;
        this.rol=_usuario.rol;
        this.password=_usuario.password;
        this.nivel=_usuario.nivel;*/
        //this.invControl.value=proyecto.idtipoInv;
      }
    }
    // @Inject(MAT_DIALOG_DATA) public _proyecto: Proyecto) { 
  

  ngOnInit(): void {
    this.gettipo_inv();
    this.getUsuarioRol(2);
    //console.log(this.proyecto);
    //console.log(this.proyectoForm.value.titulo);
    //console.log(this.proyectoForm.value.urlInv);
  }

  close(){
    this.dialogRef.close();    
  }
  
  addProyecto(){
  this.oproyecto=this.proyectoForm.value;

   let hoy=this.datepipe.transform(new Date(), 'yyyy-MM-dd');         
   this.oproyecto.fecha=hoy;   
    this.oproyecto.idusuario=this.authService.userData.idusuario;
    this.oproyecto.etapa=1; 
  // console.log(this.invControl.value.idtipoInv);
   this.oproyecto.idtipoInv=this.invControl.value.idtipoInv;
  // this.oproyecto.idasesor=this.asesorControl.value.idusuario;  
   this.oproyecto.idasesor=this.proyectoForm.value.asesor.idusuario;
  if (this.proy===null) {
   this.apiProyecto.add(this.oproyecto).subscribe(response=>{     
      if (response.exito===1){
        this.dialogRef.close();
        this.snackBar.open('proyecto guardado','',{
          duration:2000
        });
      }
    })
  }else{
    console.log ('selecciono editar')
  }
  }
gettipo_inv(){
  this.apitipo_inv.getUsuarios().subscribe(response=>{
    this.tipo_inv=response.data;   
  })
}

getUsuarioRol(rol:number){
  this.apiusuario.getUserByRol(rol).subscribe(response=>{
    this.lstUsuario=response.data;
    //console.log(this.lstUsuario);    
  })
} 
}
