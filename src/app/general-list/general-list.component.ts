import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api-service';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.css']
})
export class GeneralListComponent implements OnInit {

  lista:any = [];
  msgError: string | null = null;
  tipo: string;
  consulta: any = {}

  constructor(private route: ActivatedRoute,              
  ) {
    this.tipo = this.route.snapshot.queryParams['tipo'];
  }

  ngOnInit(): void {
    this.Consultar();    
  }  

  Consultar(Ordenar:string=''):void {

    this.msgError = null;

    if(Ordenar.length > 0) {
      if(this.consulta.Ordenar == Ordenar) {
        this.consulta.Ordenar = Ordenar + ' DESC';
      } else {
        this.consulta.Ordenar = Ordenar;
      }
    }  

    const api = new ApiService(this.tipo.toLowerCase());
    api.Get(this.consulta).then(t=> {
      if(t.IdEstado! != 0 ) {
        this.msgError = t.DsEstado;
        return;
      }

      this.lista = t.Datos;
    });

    localStorage.setItem('GeneralConsulta', JSON.stringify(this.consulta));
  }

}

