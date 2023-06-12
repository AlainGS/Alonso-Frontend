import { AfterContentInit, Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { ProductoService } from '../../../../Servicios/producto.service';
import { VentaService } from '../../../../Servicios/venta.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';

import { Producto } from '../../../../Interfaces/producto.model';
import { Venta } from '../../../../Interfaces/venta.model';
import { DetalleVenta } from '../../../../Interfaces/detalle-venta.model';

import Swal from 'sweetalert2';
import { BoletaService } from 'src/app/Servicios/boleta.service';
import { Boleta } from 'src/app/Interfaces/boleta.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})

export class VentaComponent implements OnInit{

  listaProductos: Producto[] = [];
  listaProductosFiltro: Producto[] = [];

  listaProductosParaVenta: DetalleVenta[] = [];
  bloquearBotonRegistrar: boolean = false;

  productoSeleccionado!: Producto;
  tipodePagoPorDefecto: string = "Efectivo";
  ventaTotal: number = 0;
  numeroDeVenta : string = "";

  formProductoVenta: FormGroup;
  displayedColumns: string[] = [
    'productoDescripcion',
    'productoCantidad', 
    'productoPrecio', 
    'productoTotal',
    'accion'
  ];

  datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

  retornarProductosPorFiltro(busqueda: any) : Producto[]{
    const valorBuscado = typeof busqueda === "string" ? busqueda.toLocaleLowerCase() : busqueda.productoDescripcion.toLocaleLowerCase();
    return this.listaProductos.filter(item => item.productoDescripcion.toLocaleLowerCase().includes(valorBuscado));
  }

  constructor(
    private fb: FormBuilder,
    private _boletaServicio: BoletaService,
    private _productoServicio: ProductoService,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService,
    private _router : Router
  ) {    
  }
  
  ngOnInit(): void {
    this.crearFormVenta();
  }
  
  crearFormVenta(){    
    this.formProductoVenta = this.fb.group({
      productoDescripcionF  : ['', Validators.required],
      productoCantidadF     : ['', Validators.required]
    })

    this.cargarDatosVenta();
    this.cargarUltimoNumero();
   
    this.formProductoVenta.get('productoDescripcionF')?.valueChanges.subscribe(value => {
      this.listaProductosFiltro = this.retornarProductosPorFiltro(value)
    })
    
  }

  cargarDatosVenta(){
    this._productoServicio.listarRegistros$().subscribe({
      next: (data) => {
        if (data.estadoData){
          const lista = data.cuerpoData as Producto[];
          this.listaProductos = lista.filter(pro => pro.productoStock > 0);
        }
      },
      error: (e) => {
      },
      complete: () => {
      }
    })
  }

  mostrarProducto(producto: Producto): string {
    return producto.productoDescripcion;
  }

  productoParaVenta(event: any) {
    this.productoSeleccionado = event.option.value;
  }

  //boton agregar producto
  agregarProductoParaVenta() {

    const _cantidad: number = this.formProductoVenta.value.productoCantidadF;
    const _precio: number = this.productoSeleccionado.productoPrecio;
    const _total: number = _cantidad * _precio;
    this.ventaTotal = this.ventaTotal + _total;

    this.listaProductosParaVenta.push(
      {
        productoID: this.productoSeleccionado.productoID,
        productoDescripcion: this.productoSeleccionado.productoDescripcion,
        productoCantidad: _cantidad,
        productoPrecio: _precio,
        productoTotal: _total
      })

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);

    this.formProductoVenta.patchValue({
      productoDescripcionF  : '',
      productoCantidadF     : ''
    })
  }

  eliminarProducto(detalle: DetalleVenta) {

    this.ventaTotal = this.ventaTotal - detalle.productoTotal;
    this.listaProductosParaVenta = this.listaProductosParaVenta.filter(pro => pro.productoID != detalle.productoID)

    this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);
  }

  cargarUltimoNumero(){
    this._boletaServicio.ultimoNumero$().subscribe({
      next: (data) =>{
        if(data.estadoData){
          const newBoleta = data.cuerpoData as Boleta;
          this.numeroDeVenta = newBoleta.ultimoNumeroDoc;
        }
      }
    })
  }

  //boton registrar venta
  registrarVenta() {

    if (this.listaProductosParaVenta.length > 0) {

      this.bloquearBotonRegistrar = true;
      
      const ventaDatos: Venta = {
        ventaID: 0,
        numeroBoleta: this.numeroDeVenta,
        tipoPago: this.tipodePagoPorDefecto,
        //fechaRegistro: '',
        ventaTotal: String(this.ventaTotal.toFixed(2)),
        detalleVenta: this.listaProductosParaVenta
      }

      this._ventaServicio.insertarRegistros$(ventaDatos).subscribe({
        next: (data) => {

          if (data.estadoData) {
            //reseteamos el formulario
            this.ventaTotal = 0.00;
            this.listaProductosParaVenta = [];
            this.datosDetalleVenta = new MatTableDataSource(this.listaProductosParaVenta);
            this.cargarUltimoNumero();

            Swal.fire({
              icon: 'success',
              title: 'Venta Registrada!',
              text: `Número de Venta: ${this.numeroDeVenta}`,
            });

            //this._router.navigate(['/pages/productos']);

          } else this._utilidadServicio.mostrarAlerta("No se pudo registrar la venta", "Oops");         
        },
        error: (e) => {
        },
        complete: () => {
          this.bloquearBotonRegistrar = false;
        }
      })

    }
  }

  

}
