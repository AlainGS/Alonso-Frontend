import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'inicio',
        icon: 'far fa-home-lg-alt',
        label: 'INICIO',
        items:[
            {
                routeLink: 'dashboard',
                label: 'Dashboard'                
            },
            {
                routeLink: 'contactenos',
                label: 'Contáctenos'                
            },
            {
                routeLink: 'terminosycondiciones',
                label: 'Términos y Condiciones'                
            },
        ]
    },
    {
        routeLink: 'configuracion',
        icon: 'fal fa-cog',
        label: 'CONFIGURACIÓN',
        items: [
            {
                routeLink: 'categorias',
                label: 'Categoria'
            },
            {
                routeLink: 'productos',
                label: 'Producto'
            },
            {
                routeLink: 'usuarios',
                label: 'Usuario'
            },
            
        ]       
    },
    {
        routeLink: 'farmacia',
        icon: 'fal fa-clinic-medical',
        label: 'FARMACIA',
        //expanded: true,
        items: [
            {
                routeLink: 'productos',
                label: 'Productos'                
            },
            {
                routeLink: 'ventas',
                label: 'Ventas'
            },
            {
                routeLink: 'usuarios',
                label: 'Usuarios'
            },
        ]
    },
    {
        routeLink: 'historial_ventas',
        icon: 'fal fa-history',
        label: 'HISTORIAL DE VENTAS'
    },
    {
        routeLink: 'radio',
        icon: 'fal fa-history',
        label: 'RADIO'
    },
    {
        routeLink: 'reportes',
        //icon: 'fal fa-chart-bar',
        icon: 'fal fa-clipboard-list',
        label: 'REPORTES',
        // items: [
        //     {
        //         routeLink: 'ventas',
        //         label: 'Ventas',
        //         items: [
        //             {
        //                 routeLink: 'productos/porfecha',
        //                 label: 'Por Fechas',
        //             },
        //             {
        //                 routeLink: 'productos/porcantidades',
        //                 label: 'Por Cantidades',
        //             },
                    
        //         ]
        //     },
        //     {
        //         routeLink: 'productos',
        //         label: 'Productos',
        //     }
        // ]
    },
    {
        routeLink: 'seguridad',
        icon: 'fal fa-shield-alt',
        label: 'SEGURIDAD Y ACCESOS',
        items: [
            {
                routeLink: 'productos',
                label: 'Perfiles'
            },
            {
                routeLink: 'usuarios',
                label: 'Usuarios'
            }
        ]

    },
];