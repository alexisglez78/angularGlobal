
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { VerMasComponent } from './components/ver-mas/ver-mas.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

//Material Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ScrollingModule } from '@angular/cdk/scrolling';





//Servicio http
import { HttpClientModule } from '@angular/common/http';

//ROUTES
import { APP_ROUTES } from './app.routes';

//Formulario
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Dialogos
import { DialogoDetalleComponent} from './components/dialogos/dialogo-detalle/dialogo-detalle.component';
import { DialogoInfoComponent } from './components/dialogos/dialogo-info/dialogo-info.component';

//Components
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EnvioComponent } from './components/envio/envio.component';
import { HistorialComponent } from './components/historial/historial.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { IsArrayPipe } from './pipes/is-array.pipe';
import { TablaHistorialComponent } from './components/shared/tabla-historial/tabla-historial.component';
import { CutinfoPipe } from './pipes/cutinfo.pipe';
import { PaginarPipe } from './pipes/paginar.pipe';
import { UrlPipe } from './pipes/url.pipe';
import { ImgPipe } from './pipes/img.pipe';
import { PedidoComponent } from './components/pedido/pedido.component';
import { DialogoPagosComponent } from './components/dialogos/dialogo-pagos/dialogo-pagos.component';
import { FileControlValueDirective } from './directives/file-control-value.directive';
import { CoberturaComponent } from './components/cobertura/cobertura.component';
import { DatosComponent } from './components/asociado/datos/datos.component';
import { DialogoAsociadoComponent } from './components/dialogos/dialogo-asociado/dialogo-asociado.component';
import { EstadosPipe } from './pipes/estados.pipe';
import { CuentaComponent } from './components/asociado/cuenta/cuenta.component';
import { ZonaPipe } from './pipes/zona.pipe';
import { ListaComponent } from './components/lista/lista.component';
import { AclaracionesComponent } from './components/aclaraciones/aclaraciones.component';
import { StatusReclamosPipe } from './pipes/status-reclamos.pipe';
import { DialogoReclamoComponent } from './components/dialogos/dialogo-reclamo/dialogo-reclamo.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { DialogoDireccionComponent } from './components/dialogos/dialogo-direccion/dialogo-direccion.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { NuevaDireccionComponent } from './components/direcciones/nueva-direccion/nueva-direccion.component';
import { VerDireccionComponent } from './components/direcciones/ver-direccion/ver-direccion.component';
import { GenerarComponent } from './components/dialogos/generar/generar.component';
import { LinksPipe } from './pipes/links.pipe';
import { TipsComponent } from './components/shared/tips/tips.component';
import { ImgtipsPipe } from './pipes/imgtips.pipe';
import { CuponesComponent } from './components/cupones/cupones.component';
import { CrearCuponComponent } from './components/shared/crear-cupon/crear-cupon.component';
import { VerCuponComponent } from './components/shared/ver-cupon/ver-cupon.component';
import { ApiComponent } from './components/api/api.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { DevolucionGuiaComponent } from './components/devolucion-guia/devolucion-guia.component';
import { CreacionAvisosComponent } from './components/creacion-avisos/creacion-avisos.component';
import { DevolucionesComponent } from './components/dialogos/devoluciones/devoluciones.component';
import { ApisComponent } from './components/dialogos/apis/apis.component';
import { environment } from 'src/environments/environment';
//--- Socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { TablaAvisosComponent } from './components/shared/tabla-avisos/tabla-avisos.component';
import { DialogoAvisosComponent } from './components/dialogos/dialogo-avisos/dialogo-avisos.component';
import { DevolucionMasivaComponent } from './components/devolucion-masiva/devolucion-masiva.component';
const config: SocketIoConfig = { url: environment.wsUrlDhl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    InicioComponent,
    EnvioComponent,
    HistorialComponent,
    CotizarComponent,
    DialogoDetalleComponent,
    TiendaComponent,
    CarritoComponent,
    PedidosComponent,
    MovimientosComponent,
    IsArrayPipe,
    TablaHistorialComponent,
    CutinfoPipe,
    PaginarPipe,
    UrlPipe,
    DialogoInfoComponent,
    ImgPipe,
    PedidoComponent,
    DialogoPagosComponent,
    FileControlValueDirective,
    CoberturaComponent,
    DatosComponent,
    DialogoAsociadoComponent,
    EstadosPipe,
    CuentaComponent,
    ZonaPipe,
    ListaComponent,
    AclaracionesComponent,
    StatusReclamosPipe,
    DialogoReclamoComponent,
    ToastComponent,
    DialogoDireccionComponent,
    DireccionesComponent,
    NuevaDireccionComponent,
    VerDireccionComponent,
    GenerarComponent,
    LinksPipe,
    TipsComponent,
    ImgtipsPipe,
    CuponesComponent,
    CrearCuponComponent,
    VerCuponComponent,
    ApiComponent,
    NumbersOnlyDirective,
    DevolucionGuiaComponent,
    CreacionAvisosComponent,
    DevolucionesComponent,
    ApisComponent,
    AyudaComponent,
    VerMasComponent,
    TablaAvisosComponent,
    DialogoAvisosComponent,
    DevolucionMasivaComponent
  ],
  entryComponents: [
    DialogoDetalleComponent ,
    DialogoInfoComponent,
    DialogoPagosComponent,
    DialogoAsociadoComponent,
    DialogoReclamoComponent,
    DialogoDireccionComponent,
    GenerarComponent,
    DevolucionesComponent,
    ApisComponent,
    DialogoAvisosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTES,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
