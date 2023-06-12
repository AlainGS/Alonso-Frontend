import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from '../../../../Interfaces/usuario.model';
import { UsuarioService } from '../../../../Servicios/usuario.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, AfterViewInit {
  mostrarLoading  : boolean = false;

  columnasTabla: string[] = [
    'nro',
    'usuarioNombre', 
    'usuarioCorreo', 
    'rolNombre',
    'usuarioEstado',
    'acciones'
  ];
  
  dataInicio : Usuario[] = [];  
  dataListaUsuario = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService,
    private _paginatorLabel: MatPaginatorIntl
  )
  {
    this._paginatorLabel.itemsPerPageLabel = 'Por Página';
    this._paginatorLabel.firstPageLabel = 'Primera Página';
    this._paginatorLabel.previousPageLabel = 'Anterior Página'; 
    this._paginatorLabel.nextPageLabel = 'Siguiente Página';
    this._paginatorLabel.lastPageLabel = 'Última Página';
  }

  ngOnInit(): void {
    this.cargarListadoUsuarios();    
  }

  ngAfterViewInit() {
    this.dataListaUsuario.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuario.filter = filterValue.trim().toLowerCase();
  }

  cargarListadoUsuarios() {
    this.mostrarLoading = true;
    this._usuarioServicio.listarRegistros$({}).subscribe({
      next: (data) => {
        if(data.estadoData){
          this.dataListaUsuario.data = data.cuerpoData;
          this._utilidadServicio.mostrarAlerta("Usuarios Encontrados", 'EXITO! 👨‍⚕️');
        }          
        else
          this._utilidadServicio.mostrarAlerta("No hay Usuarios Registrados", 'Oops 😢!');
      },
      error: (e) => {
        this._utilidadServicio.mostrarAlerta("Error Lista Usuarios", 'Oops!');
        this.mostrarLoading = false;
      },
      complete: () => {
        this.mostrarLoading = false;
      }
    })
  }

  nuevoUsuario() {
    const dialogRef = this.dialog
      .open(ModalUsuarioComponent, {
        disableClose: true        
      });
      
    dialogRef.afterClosed().subscribe(result => {
        if (result === "true") {
          this.cargarListadoUsuarios();
        }
      });
  }

  editarUsuario( editarRegistro: Usuario ) {
    const dialogRef = this.dialog
      .open(ModalUsuarioComponent, {
        disableClose: true,
        data: { editarRegistro }
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.cargarListadoUsuarios();
      }
    });
  }

  eliminarUsuario(eliminarRegistro: Usuario) {

    Swal.fire({
      title: "¿Desea eliminar el Usuario?",
      text: eliminarRegistro.usuarioNombre,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No"
    }).then((opcion) =>{
      if(opcion.isConfirmed){
        this._usuarioServicio.eliminarRegistros$(eliminarRegistro).subscribe({
          next: (data) => {
            if (data.estadoData) {
              this._utilidadServicio.mostrarAlerta("El usuario fue eliminado", "Listo!")
              this.cargarListadoUsuarios();
            } else {
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar el usuario", "Error");
              this.cargarListadoUsuarios();
            }
          },
          error: () => { },
          complete: () => { }
        })
      }      
    })    
  }


}
