import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Menu } from 'src/app/Interfaces/menu.model';

import { MenuService } from 'src/app/Servicios/menu.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  listaMenus: Menu[] = [];
  correoUsuario: string = "";
  rolUsuario: string = "";

  constructor(
    private _router: Router,
    private _menuServicio: MenuService,
    private _utilidadServicio: UtilidadService
    ) {}
  
  ngOnInit(): void{
    const usuarioLS = this._utilidadServicio.obtenerSesionUsuario();
    if(usuarioLS != null){
      this.correoUsuario = usuarioLS.usuarioCorreo;
      this.rolUsuario = usuarioLS.rolNombre;

      this._menuServicio.listaMenu$(usuarioLS.usuarioID).subscribe({
        next: (data) => {
          if(data.estadoData)
            this.listaMenus = data.cuerpoData;
        },
        error:(e) => {}
      })
    }
  }

  cerrarSesion(){
    this._utilidadServicio.eliminarSesionUsuario();
    this._router.navigate(['login']);
  }

}