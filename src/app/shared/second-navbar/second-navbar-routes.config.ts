import {RouteInfo} from './second-navbar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/home',
        title: 'Accueil',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    {
        path: '',
        title: 'Mes services',
        icon: '',
        clazz: 'nav-item has-sub',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: [
            {
                path: '/services/subscription-requests',
                title: 'Suivi Demandes d\'abonnements',
                icon: '',
                clazz: 'menu-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                submenu: []
            },
            {
                path: '/services/cancellation-requests',
                title: 'Suivi Demandes de résiliation',
                icon: '',
                clazz: 'menu-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                submenu: []
            },

            {
                path: '/services/embranchement-requests',
                title: 'Suivi Demandes de branchement',
                icon: '',
                clazz: 'menu-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                submenu: []
            },

            {
                path: '/services/refund-requests',
                title: 'Suivi Demandes de remboursement',
                icon: '',
                clazz: 'menu-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                submenu: []
            },
            {
                path: '/services/auto-reports',
                title: 'Suivi Auto relève',
                icon: '',
                clazz: 'menu-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                submenu: []
            }

        ]
    },
    {
        path: '/services/claim-requests',
        title: 'Réclamations',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    {
        path: '/contracts',
        title: 'Mes contrats',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    {
        path: '/invoices',
        title: 'Mes factures',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    {
        path: '/unpaid',
        title: 'Mes impayés',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    {
        path: '/settlements',
        title: 'Mes règlements',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    {
        path: '/consumptions',
        title: 'Ma consommation',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    /*
    {
        path: '/admin',
        title: 'Administration',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    */
    {
        path: '/advice',
        title: 'Conseil',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },

    {
        path: '/service_approach',
        title: 'Service & Démarche',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    }
];
