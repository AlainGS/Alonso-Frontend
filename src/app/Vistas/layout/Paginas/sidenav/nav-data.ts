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
<<<<<<< HEAD
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
            
=======
                routeLink: 'productos/level1.1',
                label: 'Mantenedores',
                items: [
                    {
                        routeLink: 'categoria',
                        label: 'Categoria'
                    },
                    {
                        routeLink: 'producto',
                        label: 'Producto'
                    },
                    {
                        routeLink: 'usuario',
                        label: 'Usuario'
                    },
                    
                ]
            }
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
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
        routeLink: 'historialdeventas',
        icon: 'fal fa-history',
        label: 'HISTORIAL DE VENTAS'
    },
    {
        routeLink: 'reportes',
        //icon: 'fal fa-chart-bar',
        icon: 'fal fa-clipboard-list',
        label: 'REPORTES',
<<<<<<< HEAD
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
=======
        items: [
            {
                routeLink: 'ventas',
                label: 'Ventas',
                items: [
                    {
                        routeLink: 'productos/porfecha',
                        label: 'Por Fechas',
                    },
                    {
                        routeLink: 'productos/porcantidades',
                        label: 'Por Cantidades',
                    },
                    
                ]
            },
            {
                routeLink: 'productos',
                label: 'Productos',
            }
        ]
>>>>>>> ae69534d15a103bd57b4598153aab38fd98cbfba
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