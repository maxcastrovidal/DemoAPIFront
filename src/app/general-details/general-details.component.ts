import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../services/api-service';
import { Generico } from '../interfaces/generico';

@Component({
  selector: 'app-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.css']
})
export class GeneralDetailsComponent implements OnInit {

  tipo: string;
  generico: Generico | undefined;

  titulo: string = "";
  textoBtnActualizar: string = "";
  msgError: string | null = null;

  constructor(private route: ActivatedRoute,
    private location: Location) {
      this.tipo = this.route.snapshot.params['tipo']
  }


  ngOnInit() {

    const id = parseInt(this.route.snapshot.params['id']);
      
    if(id==0) {
      this.titulo = "Crear nuevo " + this.tipo
      this.textoBtnActualizar = "Crear"
    }

    if(id>0) { 
      this.titulo = "Detalle " + this.tipo + " [" + id.toString() + "]"  
      this.textoBtnActualizar = "Actualizar"
    }

    if(id<0) { 
      this.titulo = "Eliminar " + this.tipo + " [" + Math.abs(id).toString() + "]"  
      this.textoBtnActualizar = "Eliminiar"    
    }


    this.CargarRegistro(id);  

  }

  CargarRegistro(id: number) {

    if (id!=0) {
      new ApiService(this.tipo).Get({Id: Math.abs(id)}).then(t=> {

        if(t.IdEstado != 0 ) {
          this.msgError = t.DsEstado;
          return;
        }

        if (t.Datos!=null) {
          this.generico = t.Datos[0];          
          if(this.generico) { this.generico.Id = id; }
        }
        
      })

    } else {
      this.generico = { Id:0}
    };
  }


  Actualizar() {
    const api = new ApiService(this.tipo);
    api.Post(this.generico!).then(t=> {
      if(t.IdEstado != 0 ) {        
        this.msgError = t.DsEstado;
      } else {
        this.location.back();
      }     
    })    
  }

  goBack(): void {
    this.location.back();
  }  

}
