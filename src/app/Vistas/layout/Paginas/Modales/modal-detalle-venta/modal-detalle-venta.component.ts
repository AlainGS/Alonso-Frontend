import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentaModel } from '../../../../Modelos/venta.model';
import { DetalleVentaModel } from '../../../../Modelos/detalle-venta.model';

@Component({
  selector: 'app-modal-detalle-venta',
  templateUrl: './modal-detalle-venta.component.html',
  styleUrls: ['./modal-detalle-venta.component.scss']
})
export class ModalDetalleVentaComponent implements OnInit {

  fechaRegistro?: string = "";
  numeroDocumento?: string = "";
  tipoPago?: string = "";
  ventaTotal?: string = "";
  
  detalleVenta: DetalleVentaModel[] = [
    // { 
    //   productoID: 1,
    //   productoDescripcion: "",
    //   productoCantidad: 0,
    //   productoPrecio: "0",
    //   productoTotal: "0"
    // },
  ]

  displayedColumns: string[] = [
    'productoDescripcion', 
    'productoCantidad', 
    'productoPrecio', 
    'productoTotal'
  ];
 
  constructor(@Inject(MAT_DIALOG_DATA) public _venta: VentaModel) {
    this.fechaRegistro = _venta.fechaRegistro;
    this.numeroDocumento = _venta.numeroDocumento;
    this.tipoPago = _venta.tipoPago;
    this.ventaTotal = _venta.ventaTotal;
    this.detalleVenta = _venta.detalleVenta == null 
        ? [{ 
            productoID: 1, 
            productoDescripcion: "", 
            productoCantidad: 0, 
            productoPrecio: 0,//"0", 
            productoTotal: 0,//"0" 
            },
          ] 
        : _venta.detalleVenta;
  }

  ngOnInit(): void {
    
  }

}
