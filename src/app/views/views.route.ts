import { Route } from '@angular/router'

import { PaymentComponent } from './main_pages/payment/payment.component'

import { PendingInvoiceComponentGeneral } from './main_pages/pending-invoice/pending-invoice.component'
import { TransactionComponent } from './main_pages/transaction/transaction.component'

import { TaxesComponent } from './main_pages/taxes/taxes.component'
import { ClientsComponent } from './main_pages/clients/clients.component'
import { UsersComponent } from './main_pages/users/users.component'
import { WalletComponent } from './main_pages/wallet/wallet.component'
import { MybillsComponent } from './main_pages/mybills/mybills.component'
import { DashboardComponent } from './main_pages/dashboard/dashboard.component'
import { QrScannerComponent } from './issuance/qr-scanner/qr-scanner.component'
import { FaqComponent } from './main_pages/faq/faq.component'
import { ContactComponent } from './main_pages/contact/contact.component'
import { PrivacyComponent } from './main_pages/privacy/privacy.component'

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
    path: 'issuance',
    loadChildren: () =>
      import('./issuance/issuance.route').then((mod) => mod.ISSUANCE_ROUTES),
  },
  {
    path: 'qr-scanner',
    component: QrScannerComponent,
    data: { title: 'Escaner de Constancia Fiscal'}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Datos y Analíticas'}
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
  {
    path: 'wallet',
    component: WalletComponent,
    data: { title: 'Cartera de Clientes'}
  },
  {
    path: 'mybills',
    component: MybillsComponent,
    data: { title: 'Mis facturas'}
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { title: 'Preguntas Frecuentes' },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { title: 'Contacto' },
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    data: { title: 'Aviso de Privacidad' },
  }
]
