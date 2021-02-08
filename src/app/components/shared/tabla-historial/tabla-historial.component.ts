import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { GlobalpaqService } from '../../../services/globalpaq.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoInfoComponent } from '../../dialogos/dialogo-info/dialogo-info.component';

@Component({
  selector: 'app-tabla-historial',
  templateUrl: './tabla-historial.component.html',
  styleUrls: ['./tabla-historial.component.css']
})
export class TablaHistorialComponent implements OnInit, OnChanges {

  @Input() paqueteria: string = "";
  loading: boolean = false;
  selected: string = "7";
  forma: FormGroup;
  opcionFecha: boolean = false;
  historial: any[] = [];
  disabled: boolean = false;
  paginas: any[] = [];
  numPaginas: number;
  auxiliar: any[] = [];
  paginaActive: number = 1;
  cantidadRegistros: number;
  resto: number;
  activeAnterior: boolean = false;
  activeSiguiente: boolean = false;
  contenedor: Element;
  iconExport: boolean = false;
  

  constructor(private gp: GlobalpaqService, public dialog: MatDialog,private cdRef: ChangeDetectorRef) {
    this.forma = new FormGroup({
      'dias': new FormControl('', Validators.required),
      'inicio': new FormControl(''),
      'fin': new FormControl(''),
      'registros': new FormControl('5', Validators.required)
    });
  }

  ngOnInit() {
    this.contenedor = document.getElementById('histori');
  }

  ngOnChanges(){
    this.loading = false;
  }

  cambiar(fecha) {
    if (fecha == 0) {
      this.opcionFecha = true;
    } else {
      this.opcionFecha = false;
    }
  }

  verPagina(pagina) {

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
    this.paginaActive = pagina;
    this.historial = [];
    let inicio;
    let fin;
    if (pagina == 1) {
      inicio = 0;
      this.activeAnterior = false;
    } else {
      inicio = (pagina - 1) * this.cantidadRegistros;
      this.activeAnterior = true;
    }

    if (pagina == this.numPaginas || this.numPaginas == 1) {
      this.activeSiguiente = false;
    } else if (pagina < this.numPaginas) {
      this.activeSiguiente = true;
    }

    fin = pagina * this.cantidadRegistros;
    for (inicio; inicio < fin; inicio++) {
      if (inicio >= this.auxiliar.length) {
        break;
      }
      // console.log(inicio);
      this.historial.push(this.auxiliar[inicio]);
    }
    window.scroll(0, 70);
    this.cdRef.detectChanges();
  }

  verSiguiente() {
    this.paginaActive += 1;
    this.verPagina(this.paginaActive);
  }

  verAnterior() {
    this.paginaActive -= 1;
    this.verPagina(this.paginaActive);
  }

  cargarTabla(){
    // console.log(this.forma.value);
    this.activeAnterior = false;
    this.activeSiguiente = false;
    this.paginaActive = 1;
    this.historial = [];
    this.disabled = true;
    this.paginas = [];
    this.auxiliar = [];
    this.cantidadRegistros = this.forma.value.registros;
    this.loading = false;
    this.gp.getHistorial(this.forma.value.dias, this.forma.value.inicio, this.forma.value.fin, this.paqueteria).subscribe((data: any) => {
      this.auxiliar = data;
      this.numPaginas = this.auxiliar.length / this.cantidadRegistros;
      this.resto = this.auxiliar.length % this.cantidadRegistros;
      // console.log(this.numPaginas);
      // console.log(this.auxiliar.length);
      this.numPaginas = Math.ceil(this.numPaginas);
      if (this.numPaginas > 1) {
        this.activeSiguiente = true;
      }
      for (let i = 1; i <= this.numPaginas; i++) {
        if (i == 6) {
          break;
        }
        this.paginas.push(i);
      }
      // this.historial = data;
      for (let i in data) {
        // console.log(i);
        if (parseInt(i) >= this.cantidadRegistros) {
          break;
        }
        this.historial.push(this.auxiliar[i]);
      }
      // console.log(this.paginas);
      this.loading = true;
      this.disabled = false;
      // console.log(this.auxiliar);
      this.cdRef.detectChanges();
    });
  }

  openDialogCancelar(tracking: string){
    const dialogRef = this.dialog.open(DialogoInfoComponent, {
      data: {
        tracking,
        paqueteria: this.paqueteria,
        tipoVista: "cancelar"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if(result == "El envio se cancelo satisfactoriamente. Ya esta disponible su guia!!"){
        let i = this.historial.findIndex(guia => guia.tracking == tracking);
        this.historial[i].statusenvio = 5;
        this.historial[i].tracking += "CANCEL";
      }
    });
  }

  openDialogDetalles(info: any): void {

    const dialogRef = this.dialog.open(DialogoInfoComponent, {
      width: '400px',
      data: {
        fecha: info.fecha,
        tracking: info.tracking,
        nombrer: info.nombrer,
        nombred: info.nombred,
        tipo: info.tipoguia,
        peso: info.pesoguia,
        idusuario: info.idusuario,
        status: info.statusenvio,
        comentario: info.comentario,
        tipoVista: "detalles"
      }
    });
  }

  openDialogTracking(tracking: string): void {

    const dialogRef = this.dialog.open(DialogoInfoComponent, {
      width: '500px',
      data: {
        tracking,
        tipoVista: "tracking",
        paqueteria: this.paqueteria
      }
    });
  }

  confirmacionCancelar(tracking:string): void {
    const dialogRef = this.dialog.open(DialogoInfoComponent, {
      width: '300px',
      data: {
        tracking,
        paqueteria: this.paqueteria,
        tipoVista: 'confirmarCancelar'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        this.openDialogCancelar(tracking);
      }
    });
  }

  exportarHistorial(){
    this.iconExport = true;
    this.gp.getHistorialFile(this.forma.value.dias, this.forma.value.inicio, this.forma.value.fin, this.paqueteria).subscribe((data:Blob) => {
      let date = new Date();
      let a = document.createElement('a');
      document.body.appendChild(a);
      let url = URL.createObjectURL(data);
      a.target = '_self';
      a.download = `Historial${this.paqueteria}_${date.getFullYear()}${date.getMonth() + 1}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
      // window.open(this.UrlFileExport);
      a.href = url;
      a.click();
      this.iconExport = false;
      // window.URL.revokeObjectURL(url);
    });
    
  }

}
