import { Component } from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

import { StatsComponent } from './components/stats/stats.component'
import { ReportComponent } from './components/report/report.component'
import { CashFlowComponent } from './components/cash-flow/cash-flow.component'
import { ExchangeRateComponent } from './components/exchange-rate/exchange-rate.component'
import { CardsComponent } from './components/cards/cards.component'
import { BalanceDetailComponent } from './components/balance-detail/balance-detail.component'
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component'
import { SendMoneyComponent } from './components/send-money/send-money.component'

@Component({
  selector: 'app-dashboard',
  imports: [
    PagetitleComponent,
    StatsComponent,
    ReportComponent,
    ExchangeRateComponent,
    BalanceDetailComponent,
    TransactionHistoryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent {}
