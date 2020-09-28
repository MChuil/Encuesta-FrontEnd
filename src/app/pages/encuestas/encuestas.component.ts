import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  inicio: number =0;
  id: number;
  resp: string;
  constructor( private route:ActivatedRoute, public encuestaService:EncuestaService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((parametros: any) => {
      this.encuestaService.leerPreguntas(parametros.id);
    })
  }

  anterior(){
    console.log(this.inicio);
    if(this.inicio > 0){
      this.inicio --;
    }else{
        console.log('Inicio');
    }
  }

  siguiente(){
    if(this.id){
      this.encuestaService.guardarRespuesta(this.resp, this.id)
      if(this.inicio < this.encuestaService.preguntas.length - 1){
        this.inicio ++;
        this.id = null;
        this.resp = null;
      }else{
          this.encuestaService.enviarEmail(); //simula envio por correo
          console.log('Finalizó');
          this.router.navigateByUrl('/fin');
      }
    }
  }

  // tslint:disable-next-line: typedef
  respuestaSeleccionada(pregunta: string, id: number){
    this.resp = pregunta;
    this.id = id;
  }

}
