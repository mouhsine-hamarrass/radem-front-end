import {RouteInfo} from './second-navbar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '/home',
    title: 'Tableau de bord',
    icon: '',
    class: 'nav-item',
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
    class: 'nav-item has-sub',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/services/claim-requests',
        title: 'Réclamations',
        icon: '',
        class: 'menu-item',
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
        class: 'menu-item',
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
        class: 'menu-item',
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
        class: 'menu-item',
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
    class: 'nav-item',
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
