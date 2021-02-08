import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'links'
})

@Injectable({
  providedIn: 'root'
})

export class LinksPipe implements PipeTransform {

  transform(value: string, paqueteria:string, ruta:string, tracking, idtipoguia?:number): any {

    if(value === 'normal'){
      return `https://sistema.globalpaq.mx/${paqueteria}/guias/${ruta}`;
    }else{
      if(idtipoguia == 31 || idtipoguia == 32){
        return `https://logiemb.com:5001/guia/${tracking}`;
      }
      if(idtipoguia == 37 || idtipoguia == 38){
        return `https://globalpaq.com.mx:4040/guia/${tracking}`;
      }
    }
  }

}
