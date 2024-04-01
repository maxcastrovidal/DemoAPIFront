import { Injectable } from '@angular/core';
import { Vehiculo, VehiculosConsulta } from '../interfaces/vehiculos';
import { RespuestaProceso } from '../interfaces/respuesta-proceso';

@Injectable({
  providedIn: 'root',
})
export class VehiculosService {

    urlApi = 'https://localhost:7263/api/vehiculos';
    status = '';

    //constructor(private http: HttpClient) { }
    constructor() { }

    async Get(consulta: VehiculosConsulta): Promise<RespuestaProceso> {
        let url = this.urlApi + '?';
        
        if(consulta.Id!=null) {
            url += '&Id=' + consulta.Id;
        }
        
        if(consulta.IdTipoVehiculo!=null) {
            url += '&IdTipoVehiculo=' + consulta.IdTipoVehiculo;
        }
        
        if(consulta.IdModeloVersion!=null) {
            url += '&IdModeloVersion=' + consulta.IdModeloVersion;
        }
        
        if(consulta.IdColorVehiculo!=null) {
            url += '&IdColorVehiculo=' + consulta.IdColorVehiculo;
        }
        
        if(consulta.IdSucursalConcesionario!=null) {
            url += '&IdSucursalConcesionario=' + consulta.IdSucursalConcesionario;
        }

        if(consulta.Patente!=null) {
            url += '&Patente=' + consulta.Patente;
        }

        if(consulta.FecCreacionDesde!=null) {
            url += '&FecCreacionDesde=' + consulta.FecCreacionDesde;
        }

        if(consulta.FecCreacionHasta!=null) {
            url += '&FecCreacionHasta=' + consulta.FecCreacionHasta;
        }

        if(consulta.Patente!=null) {
            url += '&Patente=' + consulta.Patente;
        }
        
        if(consulta.Ordenar!=null) {
            url += '&Ordenar=' + consulta.Ordenar;
        }

        if(consulta.RegistrosPagina!=null) {
            url += '&RegistrosPagina=' + consulta.RegistrosPagina;
        }

        if(consulta.NumeroPagina!=null) {
            url += '&NumeroPagina=' + consulta.NumeroPagina;
        }

        console.log('[VehiculosGet()]: Invocando ', url);
        const data = await fetch(url);
        return await data.json() ?? [];
      }

    async Post(vehiculo: Vehiculo): Promise<RespuestaProceso> {
        let url = this.urlApi;

        console.log('[VehiculosPost()]: Invocando ', url)        

        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehiculo)
        });

        return await data.json() ?? [];        

    }
       
}