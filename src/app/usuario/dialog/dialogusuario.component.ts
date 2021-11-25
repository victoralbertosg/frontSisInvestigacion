import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiusuarioService } from 'src/app/services/apiusuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-dialogusuario',
  templateUrl: '../dialog/dialogusuario.component.html',
  styleUrls: ['../dialog/dialogusuario.component.css']
})
export class DialogusuarioComponent implements OnInit {

  

  constructor(
    public dialogRef:MatDialogRef<DialogusuarioComponent>,
    public apiUsuario: ApiusuarioService,
    public snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public _usuario: Usuario,
  ) {
    if (this._usuario !==null){
      this.persona=_usuario.idpersona;
      this.especialidad=_usuario.idespecialidad;
      this.rol=_usuario.rol;
      this.password=_usuario.password;
      this.nivel=_usuario.nivel;
    }
   }

  persona: number =0;
  especialidad: number=0;
  rol:number=0;
  password:string="";
  nivel:number=0;

  

  ngOnInit(): void {
  }
  close(){
    this.dialogRef.close();
  }

  addUsuario(){
    const _usuario: Usuario={idusuario:0,idpersona:this.persona,idespecialidad:this.especialidad, rol:this.rol, password:this.password,nivel:this.nivel};
    this.apiUsuario.add(_usuario).subscribe(response=>{
      if (response.exito===1){
        this.dialogRef.close();
        this.snackBar.open('usuaior insertado con exito','',{
          duration:2000
        });
      }
    });
  }

  editUsuario(){
    const _usuario: Usuario={idusuario:this._usuario.idusuario,idpersona:this.persona,idespecialidad:this.especialidad, rol:this.rol, password:this.password,nivel:this.nivel};
    this.apiUsuario.edit(_usuario).subscribe(response=>{
      if (response.exito===1){
        this.dialogRef.close();
        this.snackBar.open('usuaior insertado con exito','',{
          duration:2000
        });
      }
    });
  }


}
