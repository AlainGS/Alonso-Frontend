import { DetalleVentaModel } from "./detalle-venta.model";

export interface VentaModel{
    ventaID: number;
    numeroDocumento: string;
    tipoPago: string;
    ventaTotal: string;
    fechaRegistro: string;
    detalleVenta: DetalleVentaModel[]
}