import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiusuarioService } from '../services/apiusuario.service';
import {Response} from '../models/response';
import {DialogusuarioComponent} from './dialog/dialogusuario.component';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from '../common/delete/delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  //public lst!: any[];
  public lst:MatTableDataSource<any>;
  public columnas: string[]=['idusuario','idpersona','nombre','Apellido','actions'];
  readonly width:string='300px';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private apiUsuario:ApiusuarioService,
    public dialog: MatDialog,
    public snackBar:MatSnackBar,
    ){}    
  
  ngOnInit(): void {
    this.getUsuarios();
  }
  getUsuarios(){
    this.apiUsuario.getUsuarios().subscribe(response=>{
      //this.lst=response.data;
      this.lst = new MatTableDataSource<Usuario>(response.data);
      this.lst.paginator = this.paginator;      
      console.log(this.lst);
    })
  }

  openAdd(){
    const dialogRef= this.dialog.open( DialogusuarioComponent,{
      width:this.width
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getUsuarios();
    });
  }

  openEdit(_usuario:Usuario){
    const dialogRef= this.dialog.open( DialogusuarioComponent,{
      width:this.width,
      data:_usuario
  });
  dialogRef.afterClosed().subscribe(result=>{
    this.getUsuarios();
  });
  }

delete(_usuario: Usuario){
  const dialogRef= this.dialog.open( DeleteComponent,{
    width:this.width   
});
dialogRef.afterClosed().subscribe(result=>{
  if (result){
    this.apiUsuario.delete(_usuario.idusuario).subscribe(response=>{
      this.snackBar.open('Usuario eliminado con exito','',{
        duration:20000
      });
      this.getUsuarios();
    })
  }
})
}

}

