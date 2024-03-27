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

    async VehiculosGet(vehiculosConsulta: VehiculosConsulta): Promise<RespuestaProceso> {
        let url = this.urlApi + '?';
        
        if(vehiculosConsulta.Id!=null) {
            url += '&Id=' + vehiculosConsulta.Id;
        }
        
        if(vehiculosConsulta.IdTipoVehiculo!=null) {
            url += '&IdTipoVehiculo=' + vehiculosConsulta.IdTipoVehiculo;
        }
        
        if(vehiculosConsulta.IdModeloVersion!=null) {
            url += '&IdModeloVersion=' + vehiculosConsulta.IdModeloVersion;
        }
        
        if(vehiculosConsulta.IdColorVehiculo!=null) {
            url += '&IdColorVehiculo=' + vehiculosConsulta.IdColorVehiculo;
        }
        
        if(vehiculosConsulta.IdSucursalConcesionario!=null) {
            url += '&IdSucursalConcesionario=' + vehiculosConsulta.IdSucursalConcesionario;
        }

        if(vehiculosConsulta.Patente!=null) {
            url += '&Patente=' + vehiculosConsulta.Patente;
        }

        if(vehiculosConsulta.FecCreacionDesde!=null) {
            url += '&FecCreacionDesde=' + vehiculosConsulta.FecCreacionDesde;
        }

        if(vehiculosConsulta.FecCreacionHasta!=null) {
            url += '&FecCreacionHasta=' + vehiculosConsulta.FecCreacionHasta;
        }

        if(vehiculosConsulta.Patente!=null) {
            url += '&Patente=' + vehiculosConsulta.Patente;
        }
        
        if(vehiculosConsulta.Ordenar!=null) {
            url += '&Ordenar=' + vehiculosConsulta.Ordenar;
        }

        console.log('[VehiculosGet()]: Invocando ', url);
        const data = await fetch(url);
        return await data.json() ?? [];
      }

    async VehiculosPost(vehiculo: Vehiculo): Promise<RespuestaProceso> {
        let url = this.urlApi;

        console.log('[VehiculosPost()]: Invocando ', url)
        console.log(vehiculo)

        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehiculo)
        });

        return await data.json() ?? [];        

    }

    async ConsultarVehiculos(obj: any): Promise<RespuestaProceso> {
        const url = this.urlApi + '/vehiculosinfo';
        console.log('[ConsultarVehiculos()]: Invocando ', url);
        console.log(JSON.stringify(obj));

        const data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
        });
        return await data.json() ?? [];
    }    
       
}