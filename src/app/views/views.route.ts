import { Route } from '@angular/router'

import { DashboardComponent } from './main_pages/dashboard/dashboard.component'

import { PaymentComponent } from './main_pages/payment/payment.component'

import { PendingInvoiceComponentGeneral } from './main_pages/pending-invoice/pending-invoice.component'
import { TransactionComponent } from './main_pages/transaction/transaction.component'

import { TaxesComponent } from './main_pages/taxes/taxes.component'
import { ClientsComponent } from './main_pages/clients/clients.component'
import { UsersComponent } from './main_pages/users/users.component'

export const VIEW_ROUTES: Route[] = [
  {
    path: 'ui',
    loadChildren: () => import('./ui/ui.route').then((mod) => mod.UI_ROUTES),
  },
  {
    path: 'advanced',
    loadChildren: () =>
      import('./advance_ui/advance-ui.route').then(
        (mod) => mod.ADVANCED_ROUTES
      ),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/forms.route').then((mod) => mod.FORMS_ROUTES),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./charts/charts.route').then((mod) => mod.CHARTS_ROUTES),
  },

  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.route').then((mod) => mod.TABLES_ROUTES),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('./maps/maps.route').then((mod) => mod.MAPS_ROUTES),
  },
  {
    path: 'email-templates',
    loadChildren: () =>
      import('./email/email.route').then((mod) => mod.EMAIL_ROUTES),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.route').then((mod) => mod.PAGES_ROUTES),
  },
  {
    path: 'apps',
    loadChildren: () =>
      import('./apps/apps.route').then((mod) => mod.APPS_ROUTES),
  },
  {
    path: 'index',
    component: DashboardComponent,
    data: { title: 'Panel de Control' },
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: { title: 'Factura Grupal' },
  },
  {
    path: 'pending-invoice',
    component: PendingInvoiceComponentGeneral,
    data: { title: 'Facturas Pendientes' },
  },
  {
    path: 'transactions',
    component: TransactionComponent,
    data: { title: 'Facturas Emitidas' },
  },
  {
    path: 'taxes',
    component: TaxesComponent,
    data: { title: 'Taxes' },
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'Usuarios' },
  },
  {
    path: 'clients',
    component: ClientsComponent,
    data: { title: 'Clientes' },
  },
]
