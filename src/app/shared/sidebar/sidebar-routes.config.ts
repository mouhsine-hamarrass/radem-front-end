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
                path: '',
                title: 'Contenu dynamique',
                icon: 'icon-files',
                clazz: 'nav-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                id: 'dynamic',
                submenu: [
                    {
                        path: '/admin/dashboard_content',
                        title: 'Tableau de bord',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'dashboard_content',
                        submenu: []
                    },
                    {
                        path: '/admin/subscription_content',
                        title: 'Demandes d\'abonnements',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'subscription_content',
                        submenu: []
                    },
                    {
                        path: '/admin/cancellation_content',
                        title: 'Demandes de résiliation',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'cancellation_content',
                        submenu: []
                    },
                    {
                        path: '/admin/autoReport_content',
                        title: 'Auto relève',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'autoReport_content',
                        submenu: []
                    },
                    {
                        path: '/admin/claim_content',
                        title: 'Réclamations',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'claim_content',
                        submenu: []
                    },
                    {
                        path: '/admin/contracts_content',
                        title: 'Mes contrats',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'contracts_content',
                        submenu: []
                    },
                    {
                        path: '/admin/unpaid_content',
                        title: 'Mes impayés',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'unpaid_content',
                        submenu: []
                    },
                    {
                        path: '/admin/settlements_content',
                        title: 'Mes réglements',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'settlements_content',
                        submenu: []
                    },
                    {
                        path: '/admin/consumptions_content',
                        title: 'Ma consommation',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'consumptions_content',
                        submenu: []
                    },
                    {
                        path: '/admin/advice_content',
                        title: 'Conseil',
                        icon: 'icon-support',
                        clazz: 'nav-item',
                        badge: '',
                        badgeClass: '',
                        isExternalLink: false,
                        isNavHeader: false,
                        id: 'advice_content',
                        submenu: []
                    },
                ]
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
        path: '',
        title: 'Réclamations',
        icon: 'icon-speech',
        clazz: '',
        badge: '',
        badgeClass: '',
        isExternalLink: false,
        isNavHeader: false,
        id: 'complaints',
        submenu: [
            {
                path: '/admin/complaints',
                title: 'Liste des réclamations',
                icon: 'icon-list',
                clazz: 'nav-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                id: 'list-complaints',
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
        id: 'alerts',
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
                id: 'alert',
                submenu: []
            },
            {
                path: '/admin/alert-notifications',
                title: 'Liste des alertes',
                icon: 'icon-list',
                clazz: 'nav-item',
                badge: '',
                badgeClass: '',
                isExternalLink: false,
                isNavHeader: false,
                id: 'list-alerts',
                submenu: []
            }
        ]
    }
];
