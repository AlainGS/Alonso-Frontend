import { Component, OnInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';
import Swal from 'sweetalert2';
import { RadioService } from 'src/app/Servicios/radio.service';
import { Radio } from 'src/app/Interfaces/radio.model';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  mostrarLoading  : boolean = false;

  displayedColumns: string[] = [
    'nro',
    'radioID',
    'nombre',
    'precio',
    //'acciones'
  ];

  dataInicio : Radio[] = [];  
  dataListaRadio = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _radioServicio: RadioService,
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
    this.cargarListadoRadio();
  }

  ngAfterViewInit() {
    this.dataListaRadio.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaRadio.filter = filterValue.trim().toLocaleLowerCase();
  }

  cargarListadoRadio() {
    this.mostrarLoading = true;
    this._radioServicio.listarRegistros$().subscribe({
      next: (data) => {
        if (data.estadoData){
          this.dataListaRadio.data = data.cuerpoData;
          this._utilidadServicio.mostrarAlerta("Radios Encontrados", 'EXITO! 💊');
        }
        else
          this._utilidadServicio.mostrarAlerta("No hay Radios Registrados", 'Oops 😢!');
      },
      error: (e) => {
        this._utilidadServicio.mostrarAlerta("Error Lista Radio", 'Oops!');
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
