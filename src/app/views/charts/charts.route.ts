import { Route } from '@angular/router'
import { ApexComponent } from './apex/apex.component'
import { JustgageComponent } from './justgage/justgage.component'
import { ChartjsComponent } from './chartjs/chartjs.component'

export const CHARTS_ROUTES: Route[] = [
  {
    path: 'apex',
    component: ApexComponent,
    data: { title: 'Apex Chart' },
  },
  {
    path: 'justgage',
    component: JustgageComponent,
    data: { title: 'Justgage' },
  },
  {
    path: 'chartjs',
    component: ChartjsComponent,
    data: { title: 'Chartjs' },
  },
]
