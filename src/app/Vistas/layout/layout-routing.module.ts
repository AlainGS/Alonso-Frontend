import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './Paginas/dash-board/dashboard.component';
import { UsuarioComponent } from './Paginas/usuario/usuario.component';
import { HistorialVentaComponent } from './Paginas/historial-venta/historialventa.component';
import { ProductoComponent } from './Paginas/producto/producto.component';
import { ReporteComponent } from './Paginas/reporte/reporte.component';
import { VentaComponent } from './Paginas/venta/venta.component';
import { ContactenosComponent } from './Paginas/contactenos/contactenos.component';
import { TerminosYCondicionesComponent } from './Paginas/terminosycondiciones/terminosycondiciones.component';
import { RadioComponent } from './Paginas/radio/radio.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent, 
    children: [
      {path:'dashboard',component:DashboardComponent},
      {path:'contactenos',component:ContactenosComponent},
      {path:'terminosycondiciones',component:TerminosYCondicionesComponent},
      {path:'usuarios',component:UsuarioComponent},
      {path:'productos',component:ProductoComponent},
      {path:'ventas',component:VentaComponent},
      {path:'historial_ventas',component:HistorialVentaComponent},
      {path:'radio',component:RadioComponent},
      {path:'reportes',component:ReporteComponent}
    ]
  }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
