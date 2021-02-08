import { Router, RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EnvioComponent } from './components/envio/envio.component';
import { HistorialComponent } from './components/historial/historial.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { CoberturaComponent } from './components/cobertura/cobertura.component';
import { DatosComponent } from './components/asociado/datos/datos.component';
import { CuentaComponent } from './components/asociado/cuenta/cuenta.component';
import { AclaracionesComponent } from './components/aclaraciones/aclaraciones.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { CuponesComponent } from './components/cupones/cupones.component';
import { DevolucionGuiaComponent } from './components/devolucion-guia/devolucion-guia.component';
import { CreacionAvisosComponent } from './components/creacion-avisos/creacion-avisos.component';
import { ApiComponent } from './components/api/api.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { VerMasComponent } from './components/ver-mas/ver-mas.component';
import { DevolucionMasivaComponent } from './components/devolucion-masiva/devolucion-masiva.component';

const ROUTES = [
    {path: 'login', component: LoginComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'envio', component: EnvioComponent},
    {path: 'direcciones', component: DireccionesComponent},
    {path: 'cotizar', component: CotizarComponent},
    {path: 'tienda', component: TiendaComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'pedidos', component: PedidosComponent},
    {path: 'movimientos', component: MovimientosComponent},
    {path: 'pedido/:id', component: PedidoComponent},
    {path: 'historial', component: HistorialComponent},
    {path: 'cobertura', component: CoberturaComponent},
    {path: 'datos-usuario', component: DatosComponent},
    {path: 'estado-cuenta', component: CuentaComponent},
    {path: 'aclaraciones', component: AclaracionesComponent},
    {path: 'cupones', component: CuponesComponent},
    {path: 'devolucion-guia', component:DevolucionGuiaComponent},
    {path: 'creacion-avisos', component: CreacionAvisosComponent},
    {path: 'api', component: ApiComponent},
    {path: 'ayuda', component: AyudaComponent},
    {path: 'ver', component: VerMasComponent},
    {path: 'cancelacion-masiva', component: DevolucionMasivaComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES);