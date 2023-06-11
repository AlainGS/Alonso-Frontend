import { Component, OnInit, ViewChild} from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalProductoComponent } from '../../Modales/modal-producto/modal-producto.component';
<<<<<<< HEAD
import { Producto } from '../../../../Interfaces/producto.model';
import { ProductoService } from '../../../../Servicios/producto.service';
=======
import { ProductoModel } from '../../../../Modelos/producto.model';
import { ProductoService } from '../../../../Controladores/producto.service';
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  mostrarLoading  : boolean = false;

  displayedColumns: string[] = [
    'nro',
    'producto',
    'categoria',
    'stock',
    'precio',
    'vencimiento',
    'acciones'];

<<<<<<< HEAD
  dataInicio : Producto[] = [];  
=======
  dataInicio : ProductoModel[] = [];  
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
  dataListaProducto = new MatTableDataSource(this.dataInicio);

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _productoServicio: ProductoService,
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
    this.cargarListadoProductos();
  }

  ngAfterViewInit() {
    this.dataListaProducto.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProducto.filter = filterValue.trim().toLocaleLowerCase();
  }

  cargarListadoProductos() {
    this.mostrarLoading = true;
    this._productoServicio.listarRegistros$().subscribe({
      next: (data) => {
        if (data.estadoData){
          this.dataListaProducto.data = data.cuerpoData;
          this._utilidadServicio.mostrarAlerta("Productos Encontrados", 'EXITO! 💊');
        }
        else
          this._utilidadServicio.mostrarAlerta("No hay Productos Registrados", 'Oops 😢!');
      },
      error: (e) => {
        this._utilidadServicio.mostrarAlerta("Error Lista Productos", 'Oops!');
        this.mostrarLoading = false;
      },
      complete: () => {
        this.mostrarLoading = false;
      }
    })
  }

  nuevoProducto() {
    const dialogRef = this.dialog.
      open(ModalProductoComponent, {
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
      if (result === "agregado") {
        this.cargarListadoProductos();
      }
    });
  }

<<<<<<< HEAD
  editarProducto(editarRegistro: Producto) {
=======
  editarProducto(editarRegistro: ProductoModel) {
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      disableClose: true,
      data: { editarRegistro }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result === "editado")
        this.cargarListadoProductos();
    });
  }

<<<<<<< HEAD
  eliminarProducto(eliminarRegistro: Producto) {
=======
  eliminarProducto(eliminarRegistro: ProductoModel) {
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba

    Swal.fire({
      title: "¿Desea eliminar el Producto?",
      text: eliminarRegistro.productoDescripcion,
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText: "Eliminar",
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: "No"
    }).then((opcion) =>{
      if(opcion.isConfirmed){
        this._productoServicio.eliminarRegistros$(eliminarRegistro).subscribe({
          next: (data) => {
            if (data.estadoData) {
              this._utilidadServicio.mostrarAlerta("El producto fue eliminado", "Listo!")
              this.cargarListadoProductos();
            } else {
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar el producto", "Error");
              this.cargarListadoProductos();
            }
          },
          error: () => { },
          complete: () => { }
        })
      }      
    })    
  }

}
