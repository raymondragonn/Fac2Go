import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-transaction-history',
  imports: [NgbDropdownModule],
  templateUrl: './transaction-history.component.html',
  styles: ``,
})
export class TransactionHistoryComponent {
  transaction = [
    {
      transaction: 'Chat Gpt',
      avatar: 'assets/images/logos/lang-logo/chatgpt.png',
      id: 'A3652',
      date: '20 July 2024',
      amount: '$560',
      status: 'Successful',
      statusBadge: 'bg-success-subtle text-success',
    },
    {
      transaction: 'Gitlab',
      avatar: 'assets/images/logos/lang-logo/gitlab.png',
      id: 'B5784',
      date: '09 July 2024',
      amount: '$2350',
      status: 'Pending',
      statusBadge: 'bg-warning-subtle text-warning',
    },
    {
      transaction: 'Nextjs',
      avatar: 'assets/images/logos/lang-logo/nextjs.png',
      id: 'C9632',
      date: '02 June 2024',
      amount: '$2200',
      status: 'Successful',
      statusBadge: 'bg-success-subtle text-success',
    },
    {
      transaction: 'Vue',
      avatar: 'assets/images/logos/lang-logo/vue.png',
      id: 'D8596',
      date: '28 May 2024',
      amount: '$1320',
      status: 'Cancelled',
      statusBadge: 'bg-danger-subtle text-danger',
    },
    {
      transaction: 'Symfony',
      avatar: 'assets/images/logos/lang-logo/symfony.png',
      id: 'E7778',
      date: '15 May 2024',
      amount: '$3650',
      status: 'Successful',
      statusBadge: 'bg-success-subtle text-success',
    },
  ]
}
