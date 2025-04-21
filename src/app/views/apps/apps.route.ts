import { Route } from '@angular/router'
import { ChatComponent } from './chat/chat.component'
import { ContactListComponent } from './contact-list/contact-list.component'
import { CalendarComponent } from './calendar/calendar.component'
import { InvoiceComponent } from './invoice/invoice.component'

export const APPS_ROUTES: Route[] = [
  {
    path: 'chat',
    component: ChatComponent,
    data: { title: 'Chat' },
  },
  {
    path: 'contact-list',
    component: ContactListComponent,
    data: { title: 'Contact List' },
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: { title: 'Calendario' },
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    data: { title: 'Factura' },
  },
]
