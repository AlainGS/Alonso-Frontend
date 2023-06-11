import { DetalleVenta } from "./detalle-venta.model";

export interface Venta{
    ventaID?: number;
    numeroBoleta?: string;
    tipoPago: string;
    fechaRegistro?: string;
    ventaTotal: string;
    detalleVenta: DetalleVenta[]
}