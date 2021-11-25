import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Response} from '../models/response';
import {Respuesta} from '../models/respuesta';
import { ActivatedRoute, Params } from '@angular/router';
import { ProyectoLista } from '../models/proyectoLista';
import { Reginv } from '../models/registroInv';
import { ApiProyectoServiceService } from '../services/api-proyecto.service';
import { ApiRegInvService } from '../services/api-reg-inv.service';
import { ApiauthService } from '../services/apiauth.service';
import { DialogEnviarComponent } from './dialog-enviar/dialog-enviar.component';
import { DialogProyectoComponent } from './dialog/dialogProyecto.component';
import { DatePipe } from '@angular/common';
import { DialogEvaluarComponent } from './dialog-evaluar/dialog-evaluar.component';
import { Proyecto } from '../models/proyecto';
import { DialogVerComponent } from './dialog-ver/dialog-ver.component';



@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit,AfterViewInit {
 
  //paginator
  @ViewChild(MatSort) sort: MatSort;  
  @ViewChild(MatPaginator) paginator: MatPaginator;   
  pageLength: number;
  pageSize: 5;
  pageSizeOptions = [5, 10, 25, 100];
  public dataSource:MatTableDataSource<any>;
  pageNumber: any;
 
 
  //
  public lst:ProyectoLista[];
  public lstFiltrado:any[];
  displayedColumns: string[] = ['idtrab_investigacion', 'titulo', 'descripcion', 'alumno','asesor','actions'];
  readonly width:string='300px';
  public paramEtapa:number;
  public proyByIdInv:Proyecto;
  public res:Response;

  //public datepipe:DatePipe;
 
  constructor(private authService:ApiauthService,
              private proyectoService:ApiProyectoServiceService,
              public dialog: MatDialog,
              private rutaActiva: ActivatedRoute,
              private regInvService:ApiRegInvService,
             // public dialogRef:MatDialogRef<DialogEnviarComponent>,
              public snackBar:MatSnackBar,
              public datepipe: DatePipe) {}

  iduser:number=this.authService.userData.idusuario;
  
  ngOnInit(): void {  
      console.log(this.rutaActiva.snapshot.params);
      this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.paramEtapa=params.etapa;     
        this.getProyecto1(this.paramEtapa);     
      }
    );
  }
 // dataSource = new MatTableDataSource(this.lst);

  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }*/

  getProyecto(){
    this.proyectoService.getallByUser(this.iduser).subscribe(response=>this.lst=response.data)         
  }
  getProyecto1(etapa:number){
    this.lstFiltrado=[];      
    console.log('parausuario',this.iduser);
    console.log('etapa:',etapa);
    this.proyectoService.getallByUserByEtapa(this.iduser,Number(etapa)).subscribe(response=>{      
      this.lstFiltrado.push(response);
      this.lst=this.lstFiltrado[0];     
      this.dataSource = new MatTableDataSource<ProyectoLista>(this.lst);
      console.log ('lista datasource',this.dataSource);
      this.dataSource.paginator = this.paginator;
      });         
    }   
  

  openAdd(){
    const dialogRef= this.dialog.open( DialogProyectoComponent,{
      width:this.width
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.getProyecto1(this.paramEtapa);  
    });
  }

 /* getUsuarios(){
    this.apiUsuario.getUsuarios().subscribe(response=>{
      this.lst=response.data;
      
      console.log(this.lst);
    })
  }*/

  openVer(id:number){
    
   
    console.log("idinv",id);
    this.regInvService.getRegByIdinv(id).subscribe(r=>{
        this.res=r;
    });
    const dialogRef= this.dialog.open( DialogVerComponent,{
      width:this.width,
      data:this.res.data
      });
        dialogRef.afterClosed().subscribe(result=>{
        this.getProyecto1(this.paramEtapa);  
      });
  }
  openEdit(proy:Proyecto){
    if(this.paramEtapa==1) {
          const dialogRef= this.dialog.open( DialogProyectoComponent,{
          width:this.width,
          data:proy
          });
            dialogRef.afterClosed().subscribe(result=>{
            this.getProyecto1(this.paramEtapa);  
          });
    }
    else { 
        console.log ('seleccion etapa 2 0 3')
        const dialogRef=this.dialog.open(DialogEvaluarComponent,{
          width:this.width,
          data:proy
        });
        dialogRef.afterClosed().subscribe(result=>{
          this.getProyecto1(this.paramEtapa); 
        })
    }     
  }


  delete(proyecto:Proyecto){

  }

  enviarProy(proyecto: Proyecto){
    console.log ('proyecto',proyecto)
   const dialogRef= this.dialog.open( DialogEnviarComponent,{
      width:this.width   
  });
  dialogRef.afterClosed().subscribe(result=>{
    if (result){        
      //let hoy=(new Date()).toLocaleDateString();
      let hoy=this.datepipe.transform(new Date(), 'yyyy-MM-dd');         
      const reginv: Reginv={idregInv:0,idtrabInvestigacion:proyecto.idtrab_investigacion,etapa:3, idusuario:this.authService.userData.idusuario, fecha:hoy,observaciones:'se eleva para revision'};      
      console.log(reginv);
      this.regInvService.add(reginv).subscribe(response=>{
      //if (response.exito===1){
         
       // }
       this.proyectoService.getByTrabInv(proyecto.idtrab_investigacion).subscribe(response=>{         
         this.proyByIdInv=response.data[0];
         this.proyByIdInv.etapa=3;
         //console.log('getbyproyecto',this.proyByIdInv);
         this.proyectoService.edit(this.proyByIdInv).subscribe(response=>{
           if (response.exito===1){
            dialogRef.close();
            this.snackBar.open('se envio para revision','',{
              duration:2000
            });
            this.getProyecto1(1);
           };
         })

       })
        console.log(reginv);
        this.getProyecto1(1);
      }); 
    }
  });
  }
  

  

  //paginator
  ngAfterViewInit() {
   // this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;    
  }    
  onChangePage(pe:PageEvent) {
    console.log(pe.pageIndex);
    console.log(pe.pageSize);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  goToPage() {
    this.paginator.pageIndex = this.pageNumber, // number of the page you want to jump.
      this.paginator.page.next({
        pageIndex: this.pageNumber,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
  }
  custom() {
    
    //this.dataSource = new MatTableDataSource();
    this.paginator.pageIndex = this.pageNumber
   // this.dataSource = new MatTableDataSource<ProyectoLista>(this.lst);
    
  }

  esEtapa1():boolean {
            
    if(this.paramEtapa==1 || this.paramEtapa==2) {
            return true;
    }
     else { 
        return false;
    }    
}

EditarLabel(etapa:Number):String{
    if (this.paramEtapa==1) {
      return 'Editar';
    }     
    return 'Evaluar'  
}
}