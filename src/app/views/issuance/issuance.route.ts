import { Route } from '@angular/router'
import { PrincipalComponent } from './principal/principal.component'


export const ISSUANCE_ROUTES: Route[] = [
  {
    path: 'principal',
    component: PrincipalComponent,
    data: { title: 'Portal de Facturación' },
  },
]
