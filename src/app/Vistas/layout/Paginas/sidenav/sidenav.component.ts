import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
<<<<<<< HEAD
import { Menu } from 'src/app/Interfaces/menu.model';
import { MenuService } from 'src/app/Servicios/menu.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';
=======
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

<<<<<<< HEAD
  listaMenus: Menu[] = [];
  correoUsuario: string = "";
  rolUsuario: string = "";

=======
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

<<<<<<< HEAD
  constructor(
    public router: Router,
    private _menuServicio: MenuService,
    private _utilidadServicio: UtilidadService
  ) {}

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      //**********
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
=======
  constructor(public router: Router) {}

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  // onMouseEntrando() {
  //   this.toggleCollapse();
  // }

  // onMouseSaliendo(){
  //   this.toggleCollapse();
  //   this.closeSidenav();
  // }

<<<<<<< HEAD
  cerrarSesion(){
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }

=======
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
}
