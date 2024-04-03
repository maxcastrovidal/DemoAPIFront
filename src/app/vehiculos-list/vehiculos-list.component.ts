import { Component, OnInit } from '@angular/core';
import { VehiculosConsulta } from '../interfaces/vehiculos';
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.css']
})
export class VehiculosListComponent implements OnInit {

  consulta: VehiculosConsulta = {
                                  RegistrosPagina: 5,
                                  NumeroPagina: 1
                                }

  lista:any = [];
  tiposVehiculo: any[] | null = null; 

  msgError: string | null = null;

  constructor() {
  }
  
  ngOnInit(): void {

    this.CargarListas();

    let tmp = localStorage.getItem('VehiculosConsulta');
    if (tmp != null) {
      this.consulta = JSON.parse(tmp);
    }

    this.Consultar();    
  }  

  CargarListas() {

    const api = new ApiService('tiposvehiculo');
    api.Get({}).then(t=> {
      if(t.IdEstado! != 0 ) {
        this.msgError = t.DsEstado;
      } else {
        this.tiposVehiculo = t.Datos;
        this.tiposVehiculo?.unshift({ Id: '0', Nombre: '(Todos)' });  
      }
    });
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

    const api = new ApiService('vehiculos');
    api.Get(this.consulta).then(t=> {
      if(t.IdEstado! != 0 ) {
        this.msgError = t.DsEstado;
        return;
      }

      this.lista = t.Datos;
    });

    localStorage.setItem('VehiculosConsulta', JSON.stringify(this.consulta));
  }

  AvanzarPagina() {
    this.consulta.NumeroPagina! ++;
    this.Consultar();
  }

  RetrocederPagina() {
    this.consulta.NumeroPagina! --;
    this.Consultar();
  }

  PrimeraPagina() {
    this.consulta.NumeroPagina! = 1;
    this.Consultar();
  }

  Limpiar():void {
    this.msgError = null;
    this.consulta.Id = null;
    this.consulta.IdTipoVehiculo = 0;
    this.consulta.IdModeloVersion = null;
    this.consulta.IdColorVehiculo = null;
    this.consulta.IdSucursalConcesionario = null;
    this.consulta.Patente = null;
    this.consulta.FecCreacionDesde = null;
    this.consulta.FecCreacionHasta = null;
    this.consulta.Ordenar = null;
  };
}
