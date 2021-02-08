import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus:boolean = false; 

  constructor(private socket: Socket) { 
  }

  checkStatus(){
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    })
  }

  emit(mensaje: string, data?:any, callback?: Function){
    this.socket.emit(mensaje, data, callback)
  }

  on(eventMensaje: string, callback: Function){
    this.socket.on(eventMensaje, callback);
  }


}
