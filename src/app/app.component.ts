import { Component } from '@angular/core';
import { TiendaService } from './services/tienda.service';
import { AsociadoService } from './services/asociado.service';
import { LoginService } from './services/login.service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'globalpaq';
  sidebar:boolean = false;
  login:boolean = false;
  abrirMenu:boolean = false;
  info: any = [];
  cantidadCarrito:number = 0;
  idasociado: number;
  nombre: string;
  

  constructor(private gp: AsociadoService, public wsTienda:TiendaService, public wsLogin : LoginService){

    this.wsLogin.validarLogin();

    this.login = this.wsLogin.loginView;
    if(!this.login){
      this.sidebar = !this.sidebar;
    }
    if (window.innerWidth < 989) {
      this.sidebar = true;
    }
    gp.getInfoAsociado().subscribe((data: any) => {
      this.info = data;
    });

    wsTienda.getCarrito().subscribe((data:any) => {
      this.cantidadCarrito = this.wsTienda.cantidad;
    });

    this.getAsociado();
    
  }

  abrirBarra(){
    if (window.innerWidth < 989) {
      this.sidebar = !this.sidebar;
    }
  }

  getAsociado(){
    this.idasociado = environment.idasociado;
    this.nombre = environment.nombre;
    // console.log('idasociad', this.idasociado);
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    location.reload();
  }

}
