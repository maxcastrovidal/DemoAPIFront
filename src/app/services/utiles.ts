import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class Utiles {

    constructor() {};

    public dateToString(date: Date | null | undefined): string {

        if(date != null && date != undefined) {
            var dt = new Date(date);
            // Obtiene el día, el mes y el año del objeto Date
            let day = dt.getDate();
            let month = dt.getMonth() + 1; // Los meses empiezan en 0
            let year = dt.getFullYear();
        
            // Convierte los números a strings y agrega un cero al inicio si son menores que 10
            let dayStr = day < 10 ? "0" + day : "" + day;
            let monthStr = month < 10 ? "0" + month : "" + month;
            let yearStr = "" + year;
        
            // Retorna el string con el formato deseado
            //return dayStr + "/" + monthStr + "/" + yearStr;
            return yearStr + "-" + monthStr + "-" + dayStr ;
        } else {
            return '';
        }
    }

    public stringToDate(dateStr: string): Date {

        // Divide el string por el caracter "/"
        let parts = dateStr.split("-");
      
        // Verifica que el string tenga el formato correcto
        if (parts.length !== 3) {
          throw new Error("El string no tiene el formato dd/MM/yyyy");
        }
      
        // Convierte los strings a números
        let day = parseInt(parts[2]);
        let month = parseInt(parts[1]) - 1; // Los meses empiezan en 0
        let year = parseInt(parts[0]);
      
        // Crea un objeto Date con los valores obtenidos
        let date = new Date(year, month, day);
      
        // Retorna el objeto Date
        return date;
      }
      
  
}