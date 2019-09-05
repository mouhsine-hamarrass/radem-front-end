import {RouteInfo} from './second-navbar.metadata';

const mainRoute = '/advices';
export const ROUTES_OFFLINE: RouteInfo[] = [
  {
    path: mainRoute + '/home',
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
        path: mainRoute + '/subscription-requests',
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
        path: mainRoute + '/cancellation-requests',
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
        path: mainRoute + '/embranchement-requests',
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
        path: mainRoute + '/refund-requests',
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
        path: mainRoute + '/auto-reports',
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
    path: mainRoute + '/invoices',
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
  },

  {
    path: '/service-approach',
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
