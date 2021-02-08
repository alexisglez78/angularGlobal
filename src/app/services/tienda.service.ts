import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Peticiones } from '../classes/peticiones';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  public cantidad:number;

  constructor(private app:Peticiones, private wsLogin: LoginService) { }

  getArticulos(){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/tienda/articulos`, 'GET').pipe(map((data:any) => {
      // console.log(data);
      let articulos = [];
      for(let articulo of data.data.articulos){
        articulos.push(articulo);
      }
      for(let articulo of data.data.autofact){
        articulos.push(articulo);
      }
      return articulos;
    }));
  }

  addCarrito(articulo,cantidad){
    this.wsLogin.validarLogin();
    // console.log(articulo);
    articulo.cantidad = cantidad;
    return this.app.getQuery(`public/tienda/carrito`, 'POST', articulo).pipe(map((data:any) => {
        return data;
    }));      
  }

  getCarrito(){
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/tienda/carrito', 'GET').pipe(map((data:any) => {
      // console.log(data);
      this.cantidad = data.data.length;
      return data.data;
    }));
  }

  borrarArticulo(id:number, tipo:string){
    let data = `${tipo}=${id}`;
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/tienda/carrito?${data}`, 'DELETE').pipe(map((data:any) => {
      return data;
    }));
  }

  addOrden(){
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/tienda/orden', 'GET').pipe(map((data:any) => {
      return data.data;
    }));
  }

  getDetallePedido(id:number){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/tienda/pedidos/${id}`, 'GET').pipe(map((data:any) => {
      return data.data;
    }));
  }

  getPedidos(cantidad, pagina){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/tienda/pedidos?cantidad=${cantidad}&pagina=${pagina}`, 'GET').pipe(map((data:any) => {
      return data;
    }));
  }

  sendComprobante(body:any){
    this.wsLogin.validarLogin();
    return this.app.sendFileQuery('public/tienda/comprobante', body).pipe(map((data:any) => {
      console.log(data);
      return data.data;
    }));
  }

  getFactura(id:number){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/tienda/factura/${id}`, 'GET').pipe(map((data:any) => {
      return data.data;
    }));
  }

  getPermisos(){
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/cotizador/permisos', 'GET').pipe(map((data:any) => {
      return data.data;
    }))
  }

  getCotizador(data){
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/cotizador', 'POST', data).pipe(map((data:any) => {
      return data.data;
    }));
  }

  getListaServicio(){
    this.wsLogin.validarLogin();
    return this.app.getQuery('public/cotizador/lista', 'GET').pipe(map((data: any) => {
      return data.data;
    }));
  }




}
