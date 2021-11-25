import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css']
})
export class FacultadComponent implements OnInit {
readonly width:string='600px';
  constructor(public dialog:MatDialog,
    public snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  openAdd(){
    const dialogRef= this.dialog.open(DialogComponent,{
    width:this.width
   });
  }

}
