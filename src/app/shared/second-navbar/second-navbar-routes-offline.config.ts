import {RouteInfo} from './second-navbar.metadata';

const mainRoute = '/advices';
export const ROUTES_OFFLINE: RouteInfo[] = [
    {
        path: mainRoute + '/home',
        title: 'Tableau de bord',
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
                path: mainRoute + '/subscription-requests',
                title: 'Demandes d\'abonnements',
                icon: '',
                clazz: 'menu-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                submenu: []
            },
            {
                path: mainRoute + '/cancellation-requests',
                title: 'Demandes de résiliation',
                icon: '',
                clazz: 'menu-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                submenu: []
            },
            {
                path: mainRoute + '/auto-reports',
                title: 'Auto relève',
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
        path: mainRoute + '/claim-requests',
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
        path: mainRoute + '/contracts',
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
        path: mainRoute + '/unpaid',
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
        path: mainRoute + '/settlements',
        title: 'Mes réglements',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    {
        path: mainRoute + '/consumptions',
        title: 'Ma consommation',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    },
    {
        path: mainRoute + '/advice',
        title: 'Conseil',
        icon: '',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
    }
];
