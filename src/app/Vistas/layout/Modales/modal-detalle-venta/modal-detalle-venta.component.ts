import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venta } from '../../../../Interfaces/venta.model';
import { DetalleVenta } from '../../../../Interfaces/detalle-venta.model';

@Component({
  selector: 'app-modal-detalle-venta',
  templateUrl: './modal-detalle-venta.component.html',
  styleUrls: ['./modal-detalle-venta.component.scss']
})
export class ModalDetalleVentaComponent implements OnInit {

  fechaRegistro: string = "";
  numeroBoleta: string = "";
  tipoPago: string = "";
  ventaTotal: string = "";
  detalleVenta: DetalleVenta[] = [];

  displayedColumns: string[] = [
    'productoID',
    'productoDescripcion', 
    'productoCantidad', 
    'productoPrecio', 
    'productoTotal'
  ];
 
  constructor(@Inject(MAT_DIALOG_DATA) public _venta: Venta) {
    this.fechaRegistro = _venta.fechaRegistro!;
    this.numeroBoleta = _venta.numeroBoleta!;
    this.tipoPago = _venta.tipoPago;
    this.ventaTotal = _venta.ventaTotal;
    this.detalleVenta = _venta.detalleVenta;
    // == null 
    //     ? [{ 
    //         productoID: 0, 
    //         productoDescripcion: "", 
    //         productoCantidad: 0, 
    //         productoPrecio: 0,
    //         productoTotal: 0,
    //         },
    //       ] 
    //     : 
    //     _venta.detalleVenta;
  }

  ngOnInit(): void { }
}
