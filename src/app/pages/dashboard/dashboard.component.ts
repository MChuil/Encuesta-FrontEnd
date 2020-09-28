import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

  itemSelect: string;

  constructor( public encuestaService: EncuestaService ) { }

  ngOnInit(): void {

  }

  // tslint:disable-next-line: typedef
  selectEncuesta(val: string){
    this.itemSelect = val;
    // console.log(this.itemSelect);
  }

}
