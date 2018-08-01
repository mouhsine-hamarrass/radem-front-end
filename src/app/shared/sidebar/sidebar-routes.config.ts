import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Demandes',
    icon: 'fa fa-book',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/requests',
        title: 'Liste des demandes',
        icon: 'fa fa-list',
        class: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Réclamations',
    icon: 'fa fa-comment',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/claims',
        title: 'Liste des réclamations',
        icon: 'fa fa-list',
        class: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Alertes',
    icon: 'fa fa-exclamation-triangle',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/alert',
        title: 'Ajouter une alerte',
        icon: 'fa fa-plus',
        class: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      }
    ]
  }
];
