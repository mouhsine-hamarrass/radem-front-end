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
        id: 'admin',
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
                id: 'users',
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
                        id: 'list-users',
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
                        id: 'user',
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
                id: 'profiles',
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
                        id: 'list-profiles',
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
                        id: 'profile',
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
                id: 'admin-alerts',
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
                id: 'settings',
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
                id: 'advices',
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
                id: 'services',
                submenu: []
            },
            {
                path: '/admin/dynamic',
                title: 'Contenu dynamique',
                icon: 'icon-list',
                clazz: 'nav-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                id: 'dynamic',
                submenu: []
            },
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
        id: 'requests',
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
                id: 'list-requests',
                submenu: []
            }
        ]
    },
    {
        path: '/admin/complaints',
        title: 'Réclamations',
        icon: 'icon-speech',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        id: 'complaints',
        submenu: []
    },
    {
        path: '/admin/alert-notifications',
        title: 'Notifications',
        icon: 'icon-bell',
        clazz: 'nav-item',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        id: 'alerts',
        submenu: []
    }
];
