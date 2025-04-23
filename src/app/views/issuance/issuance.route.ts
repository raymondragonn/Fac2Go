import { Route } from '@angular/router'
import { PrincipalComponent } from './principal/principal.component'
import { ConfirmDataComponent } from './confirm-data/confirm-data.component'


export const ISSUANCE_ROUTES: Route[] = [
  {
    path: 'principal',
    component: PrincipalComponent,
    data: { title: 'Portal de Facturación' },
  },
  {
    path: 'confirm-data',
    component: ConfirmDataComponent,
    data: { title: 'Factuación en Línea'}
  }
]
