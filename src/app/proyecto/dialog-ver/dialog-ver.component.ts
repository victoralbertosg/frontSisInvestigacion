import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ver',
  templateUrl: './dialog-ver.component.html',
  styleUrls: ['./dialog-ver.component.css']
})
export class DialogVerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public proy: any,) { 
    
  }

    ngOnInit(): void {
      console.log('dato recibido',this.proy);
  }

}
