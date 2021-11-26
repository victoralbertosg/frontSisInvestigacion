import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RegProyLista } from 'src/app/models/regProyLista';

@Component({
  selector: 'app-dialog-ver',
  templateUrl: './dialog-ver.component.html',
  styleUrls: ['./dialog-ver.component.css']
})
export class DialogVerComponent implements OnInit {

  public lst:RegProyLista[];
  public dataSource:MatTableDataSource<any>;
  displayedColumns: string[] = ['idregInv', 'idtrabInvestigacion', 'idusuario', 'fecha','observaciones'];
  constructor( @Inject(MAT_DIALOG_DATA) public proy: any,
            public dialogRef:MatDialogRef<DialogVerComponent>,
            ) {     
  }

    ngOnInit(): void {
      this.lst=this.proy;      
      console.log('dato recibido',this.lst);
      this.dataSource = new MatTableDataSource<RegProyLista>(this.lst);
      console.log('array 0 de la lista',this.lst[0].idtrabInvestigacion);
  }

  close(){
    this.dialogRef.close(); 
  }
  onNavegate(){
    //this.router.navigateByUrl("https://www.google.com");
    window.open("https://docs.google.com/spreadsheets/d/1r9PZuNwCRlkyKo-JnSsFOQVRdaQwKLpNJ0kjYq2MbDk/edit?usp=sharing", "_blank");   
  }
  ver(url:string){

  }
}
