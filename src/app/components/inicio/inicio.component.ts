import { Component, OnInit } from '@angular/core';

//Service
import { GlobalpaqService } from '../../services/globalpaq.service';
import { AsociadoService } from 'src/app/services/asociado.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  fedex: any = [];
  dhl: any = [];
  estafeta: any = [];
  info: any = [];
  loading: boolean = false;
  carga: boolean;

  constructor(private gp: GlobalpaqService, private wsAsociado: AsociadoService) {
    this.carga = false;
    wsAsociado.getInfoAsociado().subscribe((data: any) => {
      this.info = data;
      // console.log(this.info);
      this.carga = true;
    });
    gp.getGuiasDisponiblesFedex().subscribe((data: any) => {
      this.fedex = data;
      // console.log(this.fedex);
      // console.log(Array.isArray(this.fedex.terrestre));
    });
    gp.getGuiasDisponiblesDhl().subscribe((data: any) => {
      this.dhl = data;
      // console.log(this.dhl);
    });
    gp.getGuiasDisponiblesEstafeta().subscribe((data: any) => {
      this.estafeta = data;
      // console.log(this.estafeta);
      this.loading = true;
      
    });
  }

  ngOnInit() {
  }

  getGradiant(total, disponibles) {
    let totalPor = parseInt(((180 / 100) * ((disponibles * 100) / total)).toFixed(0));
    // console.log(totalPor);
    totalPor = (totalPor < 0 || totalPor === NaN || disponibles < 0) ? 0 : totalPor;
    return `linear-gradient(
      ${totalPor}deg,
      var(--primary) 50%,
      rgb(66, 66, 66) 50%)`;
  }

}
