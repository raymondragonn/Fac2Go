import { MenuItem } from '../core/models/menu.model'

export const MENU_ITEMS_ADMIN: MenuItem[] = [
  {
    key: 'general',
    label: 'General',
    isTitle: true,
  },
  // {
  //   key: 'dashboard',
  //   icon: 'iconoir-dashboard', // Panel de Control
  //   label: 'Panel de Control',
  //   url: 'dashboard',
  // },
  {
    key: 'ver-facturas',
    icon: 'las la-file-alt', // Facturas Emitidas
    label: 'Facturas Emitidas',
    url: 'invoice-history',
  },
  {
    key: 'calendario',
    icon: 'iconoir-calendar', // Calendario
    label: 'Calendario',
    url: '/apps/calendar',
  },
  {
    key: 'transacciones',
    icon: 'las la-file-alt', // Facturas Emitidas
    label: 'Transacciones',
    url: 'transactions',
  },
  // {
  //   key: 'registro-pagos',
  //   icon: 'las la-file-invoice-dollar', // Nueva Factura
  //   label: 'Nueva Factura',
  //   url: 'payment',
  // },
  // {
  //   key: 'ver-facturas-pendientes',
  //   icon: 'iconoir-task-list', // Facturas Pendientes
  //   label: 'Facturas Pendientes',
  //   url: 'pending-invoice',
  // },
  {
    key: 'admin',
    label: 'Ajustes',
    isTitle: true,
  },
  // {
  //   key: 'taxes',
  //   icon: 'las la-percentage', // Impuestos
  //   label: 'Impuestos',
  //   url: 'taxes',
  // },
  {
    key: 'users',
    icon: 'las la-users', // Usuarios
    label: 'Usuarios',
    url: 'users',
  },
  {
    key: 'clientes',
    icon: 'iconoir-user-circle', // Clientes
    label: 'Clientes',
    url: 'clients',
  },
//   {
//     key: 'componentes',
//     label: '*componentes',
//     isTitle: true,
//   },
//   {
//     key: 'componentes',
//     icon: 'iconoir-puzzle', // Componentes
//     label: 'Componentes',
//     collapsed: true,
//     subMenu: [
//       {
//         key: 'base-ui',
//         icon: 'iconoir-ui-elements', // UI Elements
//         label: 'UI Elements',
//         collapsed: true,
//         parentKey: 'componentes',
//         subMenu: [
//           {
//             key: 'base-ui-alerts',
//             label: 'Alerts',
//             url: '/ui/alerts',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-avatars',
//             label: 'Avatar',
//             url: '/ui/avatars',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-buttons',
//             label: 'Buttons',
//             url: '/ui/buttons',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-badges',
//             label: 'Badges',
//             url: '/ui/badges',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-cards',
//             label: 'Cards',
//             url: '/ui/cards',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-carousel',
//             label: 'Carousels',
//             url: '/ui/carousel',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-dropdowns',
//             label: 'Dropdowns',
//             url: '/ui/dropdowns',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-grids',
//             label: 'Grids',
//             url: '/ui/grids',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-images',
//             label: 'Images',
//             url: '/ui/images',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-list',
//             label: 'List',
//             url: '/ui/list',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-modals',
//             label: 'Modals',
//             url: '/ui/modals',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-navs',
//             label: 'Navs',
//             url: '/ui/navs',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-navbar',
//             label: 'Navbar',
//             url: '/ui/navbar',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-pagination',
//             label: 'Paginations',
//             url: '/ui/paginations',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-popover-tooltip',
//             label: 'Popover & Tooltips',
//             url: '/ui/popovers-tooltips',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-progress',
//             label: 'Progress',
//             url: '/ui/progress',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-spinners',
//             label: 'Spinners',
//             url: '/ui/spinners',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-tabs-accordion',
//             label: 'Tabs & Accordions',
//             url: '/ui/tabs-accordion',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-typography',
//             label: 'Typography',
//             url: '/ui/typography',
//             parentKey: 'base-ui',
//           },
//           {
//             key: 'base-ui-videos',
//             label: 'Videos',
//             url: '/ui/videos',
//             parentKey: 'base-ui',
//           },
//         ],
//       },
//       {
//         key: 'advanced-ui',
//         icon: 'iconoir-advanced', // Advanced UI
//         collapsed: true,
//         label: 'Advanced UI',
//         parentKey: 'componentes',
//         subMenu: [
//           {
//             key: 'advanced-ui-animation',
//             label: 'Animation',
//             url: '/advanced/animation',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-clipboard',
//             label: 'Clip Board',
//             url: '/advanced/clipboard',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-dragula',
//             label: 'Dragula',
//             url: '/advanced/dragula',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-file-manager',
//             label: 'File Manager',
//             url: '/advanced/file-manager',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-highlight',
//             label: 'Highlight',
//             url: '/advanced/highlight',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-range-slider',
//             label: 'Range Slider',
//             url: '/advanced/range-slider',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-ratings',
//             label: 'Ratings',
//             url: '/advanced/ratings',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-ribbons',
//             label: 'Ribbons',
//             url: '/advanced/ribbons',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-sweet-alert',
//             label: 'Sweet Alerts',
//             url: '/advanced/sweetalerts',
//             parentKey: 'advanced-ui',
//           },
//           {
//             key: 'advanced-ui-toast',
//             label: 'Toasts',
//             url: '/advanced/toasts',
//             parentKey: 'advanced-ui',
//           },
//         ],
//       },
//       {
//         key: 'forms',
//         icon: 'iconoir-journal-page',
//         label: 'Forms',
//         collapsed: true,
//         parentKey: 'componentes',
//         subMenu: [
//           {
//             key: 'forms-basic-elements',
//             label: 'Basic Elements',
//             url: '/forms/basic',
//             parentKey: 'forms',
//           },
//           {
//             key: 'forms-advance',
//             label: 'Advance Elements',
//             url: '/forms/advance',
//             parentKey: 'forms',
//           },
//           {
//             key: 'forms-validation',
//             label: 'Validation',
//             url: '/forms/validation',
//             parentKey: 'forms',
//           },
//           {
//             key: 'forms-wizard',
//             label: 'Wizard',
//             url: '/forms/wizard',
//             parentKey: 'forms',
//           },
//           {
//             key: 'forms-editors',
//             label: 'Editors',
//             url: '/forms/editors',
//             parentKey: 'forms',
//           },
//           {
//             key: 'forms-file-uploads',
//             label: 'File Upload',
//             url: '/forms/file-uploads',
//             parentKey: 'forms',
//           },
//           {
//             key: 'forms-image-crop',
//             label: 'Image Crop',
//             url: '/forms/image-crop',
//             parentKey: 'forms',
//           },
//         ],
//       },
//       {
//         key: 'charts',
//         label: 'Charts',
//         collapsed: true,
//         icon: 'iconoir-candlestick-chart',
//         parentKey: 'componentes',
//         subMenu: [
//           {
//             key: 'charts-apex',
//             label: 'Apex',
//             url: '/charts/apex',
//             parentKey: 'charts',
//           },
//           {
//             key: 'charts-justgage',
//             label: 'JustGage',
//             url: '/charts/justgage',
//             parentKey: 'charts',
//           },
//           {
//             key: 'charts-chartjs',
//             label: 'Chartjs',
//             url: '/charts/chartjs',
//             parentKey: 'charts',
//           },
//         ],
//       },
//       {
//         key: 'tables',
//         icon: 'iconoir-table-rows ',
//         label: 'Tables',
//         collapsed: true,
//         parentKey: 'componentes',
//         subMenu: [
//           {
//             key: 'tables-basic',
//             label: 'Basic',
//             url: '/tables/basic',
//             parentKey: 'tables',
//           },
//           {
//             key: 'tables-data-tables',
//             label: 'Datatables',
//             url: '/tables/data-tables',
//             parentKey: 'tables',
//           },
//         ],
//       },
//       {
//         key: 'icons',
//         icon: 'iconoir-trophy',
//         label: 'Icons',
//         collapsed: true,
//         parentKey: 'componentes',
//         subMenu: [
//           {
//             key: 'icons-font-awesome',
//             label: 'Font Awesome',
//             url: '/icons/fa',
//             parentKey: 'icons',
//           },
//           {
//             key: 'icons-line-awesome',
//             label: 'Line Awesome',
//             url: '/icons/la',
//             parentKey: 'icons',
//           },
//           {
//             key: 'icons-icofont',
//             label: 'Icofont',
//             url: '/icons/icofont',
//             parentKey: 'icons',
//           },
//           {
//             key: 'icons-iconoir',
//             label: 'Iconoir',
//             url: '/icons/iconoir',
//             parentKey: 'icons',
//           },
//         ],
//       },
//       {
//         key: 'maps',
//         collapsed: true,
//         icon: 'iconoir-navigator-alt',
//         label: 'Maps',
//         parentKey: 'componentes',
//         subMenu: [
//           {
//             key: 'maps-google',
//             label: 'Google Maps',
//             url: '/maps/google',
//             parentKey: 'maps',
//           },
//           {
//             key: 'maps-leaflet',
//             label: 'Leaflet Maps',
//             url: '/maps/leaflet',
//             parentKey: 'maps',
//           },
//           {
//             key: 'maps-vector',
//             label: 'Vector Maps',
//             url: '/maps/vector',
//             parentKey: 'maps',
//           },
//         ],
//       },
//       {
//         key: 'email-templates',
//         collapsed: true,
//         label: 'Email Templates',
//         icon: 'iconoir-send-mail',
//         parentKey: 'componentes',
//         subMenu: [
//           {
//             key: 'email-templates-basic',
//             label: 'Basic Action Email',
//             url: '/email-templates/basic',
//             parentKey: 'email-templates',
//           },
//           {
//             key: 'email-templates-alert',
//             label: 'Alert Email',
//             url: '/email-templates/alert',
//             parentKey: 'email-templates',
//           },
//           {
//             key: 'email-templates-billing',
//             label: 'Billing Email',
//             url: '/email-templates/billing',
//             parentKey: 'email-templates',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: 'paginas',
//     label: 'Páginas',
//     collapsed: true,
//     isTitle: false,
//     icon: 'iconoir-page-star',
//     subMenu: [
//       {
//         key: 'page-profile',
//         label: 'Profile',
//         url: '/pages/profile',
//         parentKey: 'paginas',
//       },
//       {
//         key: 'page-notifications',
//         label: 'Notifications',
//         url: '/pages/notifications',
//         parentKey: 'paginas',
//       },
//       {
//         key: 'page-timeline',
//         label: 'Timeline',
//         url: '/pages/timeline',
//         parentKey: 'paginas',
//       },
//       {
//         key: 'page-tree-view',
//         label: 'Treeview',
//         url: '/pages/treeview',
//         parentKey: 'paginas',
//       },
//       {
//         key: 'page-starter',
//         label: 'Starter Page',
//         url: '/pages/starter',
//         parentKey: 'paginas',
//       },
//       {
//         key: 'page-pricing',
//         label: 'Pricing',
//         url: '/pages/pricing',
//         parentKey: 'paginas',
//       },
//       {
//         key: 'page-blogs',
//         label: 'Blogs',
//         url: '/pages/blogs',
//         parentKey: 'paginas',
//       },
//       {
//         key: 'page-faqs',
//         label: 'FAQs',
//         url: '/pages/faqs',
//         parentKey: 'paginas',
//       },
//       {
//         key: 'page-gallery',
//         label: 'Gallery',
//         url: '/pages/gallery',
//         parentKey: 'paginas',
//       },
//     ],
//   },
//   {
//     key: 'autenticacion',
//     label: 'Autenticación',
//     isTitle: false,
//     collapsed: true,
//     icon: 'iconoir-fingerprint-lock-circle',
//     subMenu: [
//       {
//         key: 'login-admin',
//         label: 'Log in',
//         url: '/auth/login-admin',
//         parentKey: 'autenticacion',
//       },
//       {
//         key: 'register-admin',
//         label: 'Register',
//         url: '/auth/register-admin',
//         parentKey: 'autenticacion',
//       },
//       {
//         key: 'reset-pass',
//         label: 'Re-Password',
//         url: '/auth/reset-pass',
//         parentKey: 'autenticacion',
//       },
//       {
//         key: 'lock-screen',
//         label: 'Lock Screen',
//         url: '/auth/lock-screen',
//         parentKey: 'autenticacion',
//       },
//       {
//         key: 'maintenance',
//         label: 'Maintenance',
//         url: '/maintenance',
//         target: '_blank',
//         parentKey: 'autenticacion',
//       },
//       {
//         key: 'error-404',
//         label: 'Error 404',
//         url: '/not-found',
//         parentKey: 'autenticacion',
//       },
//       {
//         key: 'error-500',
//         label: 'Error 500',
//         url: '/error-500',
//         parentKey: 'autenticacion',
//       },
//     ],
//   },
]
