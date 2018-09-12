import {RouteInfo} from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '',
    title: 'Administration',
    icon: 'icon-settings',
    clazz: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '',
        title: 'Utilisateurs',
        icon: 'icon-users',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: [
          {
            path: '/admin/users',
            title: 'Liste des utilisateurs',
            icon: 'icon-list',
            clazz: 'nav-item',
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
            clazz: 'nav-item',
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
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: [
          {
            path: '/admin/profiles',
            title: 'Liste de profils',
            icon: 'icon-list',
            clazz: 'nav-item',
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
            clazz: 'nav-item',
            badge: '',
            badgeClass: '',
            isExternalLink: false,
            isNavHeader: false,
            submenu: []
          }
        ]
      },
      {
        path: '/admin/alerts',
        title: 'Alertes',
        icon: 'icon-bell',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/settings',
        title: 'Paramétrage',
        icon: 'icon-settings',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/advices',
        title: 'Conseils',
        icon: 'icon-support',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      },
      {
        path: '/admin/services',
        title: 'Services',
        icon: 'icon-directions',
        clazz: 'nav-item',
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
    title: 'Demandes',
    icon: 'icon-envelope-letter',
    clazz: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/requests',
        title: 'Liste des demandes',
        icon: 'icon-list',
        clazz: 'nav-item',
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
    clazz: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/claims',
        title: 'Liste des réclamations',
        icon: 'icon-list',
        clazz: 'nav-item',
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
    clazz: '',
    badge: '',
    badgeClass: '',
    isExternalLink: false,
    isNavHeader: false,
    submenu: [
      {
        path: '/admin/alert-notification',
        title: 'Ajouter une alerte',
        icon: 'icon-plus',
        clazz: 'nav-item',
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
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        submenu: []
      }
    ]
  }
];
