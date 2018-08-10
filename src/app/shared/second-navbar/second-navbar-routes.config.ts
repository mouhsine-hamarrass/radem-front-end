import {RouteInfo} from './second-navbar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/home',
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
        path: '/services/claim-requests',
        title: 'Réclamations',
        icon: '',
        clazz: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/services/subscription-request',
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
        path: '/services/cancellation-requests',
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
        path: '/services/online-payment',
        title: 'Paiement en ligne',
        icon: '',
        clazz: 'menu-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
    ]
  },
  {
    path: '/contracts/all-contracts',
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
    path: '/account/unpaid',
    title: 'Mes impayés',
    icon: '',
    class: 'nav-item',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: []
  },
  {
    path: '/account/settlements',
    title: 'Mes réglements',
    icon: '',
    class: 'nav-item',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: []
  },
  {
    path: '/consumption',
    title: 'Ma consomtaion',
    icon: '',
    class: 'nav-item',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: []
  }
];
