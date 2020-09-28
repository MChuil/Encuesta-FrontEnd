import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  dataEncuesta: any;
  preguntas: any[];

  constructor(private http: HttpClient){
    // Leer JSON
    this.http.get('assets/data/data-encuestas.json')
    .subscribe( resp => {
      this.dataEncuesta = resp;
    });
  }

  leerPreguntas(encuesta:string){
    encuesta = encuesta.toLocaleLowerCase();
    this.http.get(`assets/data/${encuesta}.json`)
     .subscribe( (resp:any[]) => {
       this.preguntas = resp;
     });
  }

  guardarRespuesta(pregunta: string, id: number){
    let data = {
      "id" : id,
      "pregunta" : pregunta
    };
    let listaRespuestas = [];
    listaRespuestas = JSON.parse(localStorage.getItem('respuestas'));
    if(listaRespuestas == null){
      listaRespuestas = [];
      listaRespuestas.push(data);
      localStorage.setItem('respuestas', JSON.stringify(listaRespuestas));
    }else{
      let existe = false;
      listaRespuestas.forEach(element => {
          if (element.pregunta === pregunta){
              element.id = id;
              existe = true;
          }
      });
      if(!existe){
        listaRespuestas.push(data);
        localStorage.setItem('respuestas', JSON.stringify(listaRespuestas));
      }else{
        localStorage.setItem('respuestas', JSON.stringify(listaRespuestas));
      }
      }
    }

  enviarEmail(){
    let listaRespuestas = [];
    listaRespuestas = JSON.parse(localStorage.getItem('respuestas'));
    console.log(listaRespuestas);
  }
}
