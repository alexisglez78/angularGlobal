import { Injectable } from '@angular/core';
import { Peticiones } from '../classes/peticiones';
import { LoginService } from './login.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuponesService {

  constructor(private app:Peticiones, private wsLogin: LoginService) { }

  getCupones(pagina,cantidad,search){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/cupones?pagina=${pagina}&cantidad=${cantidad}&search=${search}`, 'GET').pipe(map((data:any) => {
      return data;
    }));
  }
  deleteCupon(id){
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/cupones?id=${id}`, 'DELETE').pipe(map((data:any) => {
      return data;
    }));            
  }
  createCupon(params:any){
    console.log(params);
    this.wsLogin.validarLogin();
    return this.app.getQuery(`public/cupones`, 'PUT',params).pipe(map((data:any) => {
      return data;
    }));  
  }
  
}
