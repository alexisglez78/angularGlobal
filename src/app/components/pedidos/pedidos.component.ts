import { Component, OnInit } from '@angular/core';
import { TiendaService } from 'src/app/services/tienda.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoInfoComponent } from '../dialogos/dialogo-info/dialogo-info.component';
import { DialogoPagosComponent } from '../dialogos/dialogo-pagos/dialogo-pagos.component';
import { findIndex } from 'rxjs/operators';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  loading: boolean = false;
  disabled: boolean = false;
  pedidos: any[];
  totalRegistros: number;
  forma: FormGroup;
  paginas: any[] = [];
  activeAnterior: boolean = false;
  activeSiguiente: boolean = false;
  paginaActive: number = 1;
  cantidadRegistros: number;
  auxiliar: any[] = [];
  numPaginas: number;
  carga:boolean = false;

  constructor(private wsTienda: TiendaService, public dialog: MatDialog) {
    this.forma = new FormGroup({
      'registros': new FormControl('5', Validators.required)
    });
  }

  ngOnInit() {
    this.visualizar();
  }

  visualizar() {
    this.reiniciar();
    this.getPedidos(1);
    setTimeout(() => {
      this.numPaginas = Math.ceil(this.totalRegistros / this.forma.value.registros);
      if (this.numPaginas > 1) {
        this.activeSiguiente = true;
      }
      console.log(this.numPaginas);
      for (let i = 1; i <= this.numPaginas; i++) {
        if (i == 6) {
          break;
        }
        this.paginas.push(i);
      }
      this.loading = true;
      this.disabled = false;
    }, 1500);

  }


  getPedidos(pagina: number) {
    return this.wsTienda.getPedidos(this.forma.value.registros, pagina).subscribe((data: any) => {
      this.pedidos = data.data;
      this.totalRegistros = data.total;
      this.carga = true;
      return data;
      console.log(this.pedidos);
    });
  }

  verPagina(pagina: number) {
    //Si pagina es mayor o igual a 3 y la cantidad de paginas es mayor o igual a 5,
    //limpia el arreglo de paginas y reacomoda los numeros
    if (pagina >= 3 && pagina < this.numPaginas - 1 && this.numPaginas >= 5) {
      this.paginas = [];
      for (let i = pagina - 2; i <= pagina + 2; i++) {
        this.paginas.push(i);
      }
    }
    if (pagina == 2 && pagina < this.numPaginas - 1 && this.numPaginas >= 5) {
      this.paginas = [];
      for (let i = pagina - 1; i <= pagina + 3; i++) {
        this.paginas.push(i);
      }
    }
    if (pagina == this.numPaginas - 1 && pagina <= this.numPaginas - 1 && this.numPaginas >= 5) {
      this.paginas = [];
      for (let i = pagina - 3; i <= pagina + 1; i++) {
        this.paginas.push(i);
      }
    }
    window.scroll(0, 70);
    this.getPedidos(pagina);
    this.paginaActive = pagina;
    if (pagina == 1) {
      this.activeAnterior = false;
    } else {
      this.activeAnterior = true;
    }
    
  }

  verSiguiente() {
    this.paginaActive += 1;
    this.verPagina(this.paginaActive);
  }

  verAnterior() {
    this.paginaActive -= 1;
    this.verPagina(this.paginaActive);
  }

  reiniciar() {
    this.pedidos = [];
    this.auxiliar = [];
    this.cantidadRegistros = this.forma.value.registros;
    this.loading = false;
    this.paginas = [];
    this.activeAnterior = false;
    this.activeSiguiente = false;
    this.paginaActive = 1;
    this.disabled = true;
  }

  verDetalle(id: number) {
    this.wsTienda.getDetallePedido(id).subscribe((data: any) => {
      console.log(data);
      this.openDialogArticulos(data);
    });
  }

  openDialogArticulos(articulo: any): void {

    const dialogRef = this.dialog.open(DialogoInfoComponent, {
      width: '800px',
      data: {
        articulo,
        tipoVista: 'verDetalle'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        console.log('ok');
      }
    });
  }

  openDialogFactura(id:number){
    const dialogRef = this.dialog.open(DialogoInfoComponent, {
      width: '600px',
      data: {
        id,
        tipoVista: 'factura'
      }
    });
  }

  openDialogComprobante(id:number){
    const dialogRef = this.dialog.open(DialogoPagosComponent, {
      width: '800px',
      data: {
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        let i = this.pedidos.findIndex(venta => venta.idventa == id);
        this.pedidos[i].comprobante = true;
      }
    });
  }


}
