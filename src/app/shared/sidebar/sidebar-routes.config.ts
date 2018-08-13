import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '',
    title: 'Administration',
    icon: 'icon-settings',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '',
        title: 'Utilisateurs',
        icon: 'icon-users',
        class: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: [
          {
            path: '/admin/users',
            title: 'Liste des utilisateurs',
            icon: 'icon-list',
            class: 'nav-item',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            isNavHeader: false,
            submenu: []
          },
          {
            path: '/admin/user',
            title: 'Nouveau utilisateur',
            icon: 'icon-user-follow',
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
        title: 'Profils',
        icon: 'icon-graduation',
        class: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: [
          {
            path: '/admin/profiles',
            title: 'Liste de profils',
            icon: 'icon-list',
            class: 'nav-item',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            isNavHeader: false,
            submenu: []
          },
          {
            path: '/admin/profile',
            title: 'Nouveau profil',
            icon: 'icon-ghost',
            class: 'nav-item',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            isNavHeader: false,
            submenu: []
          }
        ]
      }
    ]
  },
  {
    path: '',
    title: 'Demandes',
    icon: 'icon-envelope-letter',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/requests',
        title: 'Liste des demandes',
        icon: 'icon-list',
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
    icon: 'icon-speech',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/claims',
        title: 'Liste des réclamations',
        icon: 'icon-list',
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
    icon: 'icon-bell',
    class: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/alert',
        title: 'Ajouter une alerte',
        icon: 'icon-plus',
        class: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/alerts',
        title: 'Liste des alertes',
        icon: 'icon-list',
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
