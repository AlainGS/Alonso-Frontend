import { Component, OnInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { UtilidadService } from 'src/app/ZModulos/utilidad.service';
import { Tv } from 'src/app/Interfaces/tv.model';
import { TvService } from 'src/app/Servicios/tv.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  mostrarLoading  : boolean = false;

  displayedColumns: string[] = [
    'nro',
    'teleID',
    'nombre',
    'precio',
    //'acciones'
  ];

  dataInicio : Tv[] = [];  
  dataListaTv = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _tvServicio: TvService,
    private _utilidadServicio: UtilidadService,
    private _paginatorLabel: MatPaginatorIntl
  ) {
    this._paginatorLabel.itemsPerPageLabel = 'Por Página';
    this._paginatorLabel.firstPageLabel = 'Primera Página';
    this._paginatorLabel.previousPageLabel = 'Anterior Página'; 
    this._paginatorLabel.nextPageLabel = 'Siguiente Página';
    this._paginatorLabel.lastPageLabel = 'Última Página';
  }

  ngOnInit(): void {
    this.cargarListadoTv();
  }

  ngAfterViewInit() {
    this.dataListaTv.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaTv.filter = filterValue.trim().toLocaleLowerCase();
  }

  cargarListadoTv() {
    this.mostrarLoading = true;
    this._tvServicio.listarRegistros$().subscribe({
      next: (data) => {
        if (data.estadoData){
          this.dataListaTv.data = data.cuerpoData;
          this._utilidadServicio.mostrarAlerta("Televisores Encontrados", 'EXITO! 💊');
        }
        else
          this._utilidadServicio.mostrarAlerta("No hay Televisores Registrados", 'Oops 😢!');
      },
      error: (e) => {
        this._utilidadServicio.mostrarAlerta("Error Lista Televisor", 'Oops!');
        this.mostrarLoading = false;
      },
      complete: () => {
        this.mostrarLoading = false;
      }
    })
  }

  // nuevoProducto() {
  //   const dialogRef = this.dialog.
  //     open(ModalProductoComponent, {
  //       disableClose: true
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //     if (result === "agregado") {
  //       this.cargarListadoProductos();
  //     }
  //   });
  // }

  // editarProducto(editarRegistro: Producto) {
  //   const dialogRef = this.dialog.open(ModalProductoComponent, {
  //     disableClose: true,
  //     data: { editarRegistro }
  //   });
    
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === "editado")
  //       this.cargarListadoProductos();
  //   });
  // }

  // eliminarProducto(eliminarRegistro: Producto) {

  //   Swal.fire({
  //     title: "¿Desea eliminar el Producto?",
  //     text: eliminarRegistro.productoDescripcion,
  //     icon: "warning",
  //     confirmButtonColor: '#3085d6',
  //     confirmButtonText: "Eliminar",
  //     showCancelButton: true,
  //     cancelButtonColor: '#d33',
  //     cancelButtonText: "No"
  //   }).then((opcion) =>{
  //     if(opcion.isConfirmed){
  //       this._productoServicio.eliminarRegistros$(eliminarRegistro).subscribe({
  //         next: (data) => {
  //           if (data.estadoData) {
  //             this._utilidadServicio.mostrarAlerta("El producto fue eliminado", "Listo!")
  //             this.cargarListadoProductos();
  //           } else {
  //             this._utilidadServicio.mostrarAlerta("No se pudo eliminar el producto", "Error");
  //             this.cargarListadoProductos();
  //           }
  //         },
  //         error: () => { },
  //         complete: () => { }
  //       })
  //     }      
  //   })    
  // }

}
