import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoriaModel } from '../../../../Modelos/categoria.model';
import { ProductoModel } from '../../../../Modelos/producto.model';
import { CategoriaService } from '../../../../Controladores/categoria.service';
import { ProductoService } from '../../../../Controladores/producto.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {
  formProducto: FormGroup;
  tituloAccion:string ="Agregar"
  botonAccion: string = "Guardar";
  listaCategorias: CategoriaModel[] = [];
  mostrarLoading : boolean = false;

  registro : ProductoModel;

  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: any,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _productoServicio: ProductoService,
    private _utilidadServicio: UtilidadService
  ) {
    this.crearModal();
  }

  ngOnInit(): void {
    this.registro = this.datosProducto.editarRegistro ? this.datosProducto.editarRegistro : null;
    this.cargarDatosModal();
  }

  crearModal(){
    this.formProducto = this.fb.group({
      productoDescripcionF  : ['', Validators.required],
      categoriaIDF          : ['', Validators.required],
      productoStockF        : ['', Validators.required],
      productoPrecioF       : ['', Validators.required],
      fechaVencimientoF     : ['', Validators.required],
      productoEstadoF       : [1 , Validators.required]
    })

    if (this.registro) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
    this.listarComboCategoria();
  }

  cargarDatosModal(){
    this.mostrarLoading = true;
    if (this.registro) {
      this.formProducto.patchValue({
        productoDescripcionF  : this.registro.productoDescripcion,
        categoriaIDF          : this.registro.categoriaID,
        productoStockF        : this.registro.productoStock,
        productoPrecioF       : this.registro.productoPrecio,
        fechaVencimientoF     : this.registro.fechaVencimiento,
        productoEstadoF       : this.registro.productoEstado
      })
    }
    this.mostrarLoading = false;
  }

  agregarEditarProducto() {
    this.mostrarLoading = true;
    //PREPARAR PRODUCTO MODAL
    const registroDatos: ProductoModel = {
      productoID: this.registro == null ? 0 : this.registro.productoID,
      productoDescripcion  : this.formProducto.value.productoDescripcionF,
      categoriaID          : this.formProducto.value.categoriaIDF,
      productoStock        : this.formProducto.value.productoStockF,
      productoPrecio       : this.formProducto.value.productoPrecioF,
      fechaVencimiento     : this.formProducto.value.fechaVencimientoF,
      productoEstado       : parseInt(this.formProducto.value.productoEstadoF)
    }

    //ACTUALIZAR PRODUCTO
    if (this.registro) {

      this._productoServicio.actualizarRegistros$(registroDatos).subscribe({
        next: (data) => {

          if (data.estadoData) {
            this._utilidadServicio.mostrarAlerta("El producto fue editado", "Exito");
            this.modalActual.close('editado')
          } else {
            this._utilidadServicio.mostrarAlerta("No se pudo editar el producto", "Error");
          }
        },
        error: () => {
          this.mostrarLoading = false;
        },
        complete: () => {
          this.mostrarLoading = false;
        }
      })


    } //INSERTAR PRODUCTO
      else {

      this._productoServicio.insertarRegistros$(registroDatos).subscribe({
        next: (data) => {

          if (data.estadoData) {
            this._utilidadServicio.mostrarAlerta("El producto fue registrado", "Exito");
            this.modalActual.close('agregado')
          } else {
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el producto", "Error");
          }
        },
        error: () => {
          this.mostrarLoading = false;
        },
        complete: () => {
          this.mostrarLoading = false;
        }
      })
    }
    this.mostrarLoading = false;
  }

  listarComboCategoria(){
    this.mostrarLoading = true;
    this._categoriaServicio.listarRegistros$().subscribe({
      next: (data) => {
        if (data.estadoData) {
          this.listaCategorias = data.cuerpoData;
          if (this.registro){
            this.formProducto.patchValue({
              categoriaID: this.registro.categoriaID
            });
            this._utilidadServicio.mostrarAlerta("Combo Categoria", 'LISTO!');
          }
        }
      },
      error: (e) => {
        this._utilidadServicio.mostrarAlerta("Error Combo Categoria", 'Oops!');
        this.mostrarLoading = false;
      },
      complete: () => {
        this.mostrarLoading = false;
      }
    })
  }

}
