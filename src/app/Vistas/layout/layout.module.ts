//default
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from '../layout/layout-routing.module';

<<<<<<< HEAD
import { DashboardComponent } from './Paginas/dash-board/dashboard.component';
import { UsuarioComponent } from './Paginas/usuario/usuario.component';
import { ProductoComponent } from './Paginas/producto/producto.component';
import { VentaComponent } from './Paginas/venta/venta.component';
import { HistorialVentaComponent } from './Paginas/historial-venta/historialventa.component';
import { ReporteComponent } from './Paginas/reporte/reporte.component';
=======
// import { DashboardComponent } from './Paginas/dash-board/dashboard.component';
import { UsuarioComponent } from './Paginas/usuario/usuario.component';
// import { ProductoComponent } from './Paginas/producto/producto.component';
// import { VentaComponent } from './Paginas/venta/venta.component';
// import { HistorialVentaComponent } from './Paginas/historial-venta/historialventa.component';
// import { ReporteComponent } from './Paginas/reporte/reporte.component';
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba

//nuevos
import { CompartidosModule } from 'src/app/ZModulos/compartidos.module';

import { ModalUsuarioComponent } from './Modales/modal-usuario/modal-usuario.component';
import { ModalProductoComponent } from './Modales/modal-producto/modal-producto.component';
import { ModalDetalleVentaComponent } from './Modales/modal-detalle-venta/modal-detalle-venta.component';

import { NavigationComponent } from './Paginas/navigation/navigation.component';
import { SidenavComponent } from './Paginas/sidenav/sidenav.component';
import { SublevelMenuComponent } from './Paginas/sidenav/sublevel-menu.component';
<<<<<<< HEAD
import { FooterComponent } from './Paginas/footer/footer.component';
import { BodyComponent } from './Paginas/body/body.component';
import { ContactenosComponent } from './Paginas/contactenos/contactenos.component';
import { TerminosYCondicionesComponent } from './Paginas/terminosycondiciones/terminosycondiciones.component';
=======
import { BodyComponent } from './Paginas/body/body.component';
 import { ContactenosComponent } from './Paginas/contactenos/contactenos.component';
 import { TerminosYCondicionesComponent } from './Paginas/terminosycondiciones/terminosycondiciones.component';
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba

@NgModule({
  declarations: [
    LayoutComponent,
    
<<<<<<< HEAD
    DashboardComponent,
    UsuarioComponent,
    ProductoComponent,
    VentaComponent,
    HistorialVentaComponent,
    ReporteComponent,
    ContactenosComponent,
    TerminosYCondicionesComponent,

    ModalUsuarioComponent,
    ModalProductoComponent,
    ModalDetalleVentaComponent,
=======
    // DashboardComponent,
     UsuarioComponent,
    // ProductoComponent,
    // VentaComponent,
    // HistorialVentaComponent,
    // ReporteComponent,
     ContactenosComponent,
     TerminosYCondicionesComponent,

     ModalUsuarioComponent,
     ModalProductoComponent,
     ModalDetalleVentaComponent,
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba

    NavigationComponent,
    SidenavComponent,
    SublevelMenuComponent,
<<<<<<< HEAD
    FooterComponent,
=======
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
    BodyComponent
  ],

  imports: [
    //default
    CommonModule,
    LayoutRoutingModule,

    //nuevo
    CompartidosModule
  ]
})

export class LayoutModule { }