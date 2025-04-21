import { Component } from '@angular/core'

@Component({
  selector: 'app-send-money',
  imports: [],
  templateUrl: './send-money.component.html',
  styles: ``,
})
export class SendMoneyComponent {
  sendMoneyData = [
    {
      name: 'Scott Holland',
      avatar: 'assets/images/users/avatar-1.jpg',
      id: '#3652',
      amount: '$3325.00',
      actionIcon: 'las la-sync-alt',
    },
    {
      name: 'Karen Savage',
      avatar: 'assets/images/users/avatar-2.jpg',
      id: '#4789',
      amount: '$2548.00',
      actionIcon: 'las la-sync-alt',
    },
    {
      name: 'Steven Sharp',
      avatar: 'assets/images/users/avatar-3.jpg',
      id: '#4521',
      amount: '$2985.00',
      actionIcon: 'las la-sync-alt',
    },
    {
      name: 'Teresa Himes',
      avatar: 'assets/images/users/avatar-4.jpg',
      id: '#3269',
      amount: '$1845.00',
      actionIcon: 'las la-sync-alt',
    },
    {
      name: 'Ralph Denton',
      avatar: 'assets/images/users/avatar-5.jpg',
      id: '#4521',
      amount: '$1422.00',
      actionIcon: 'las la-sync-alt',
    },
    {
      name: 'Steven Sharp',
      avatar: 'assets/images/users/avatar-9.jpg',
      id: '#4521',
      amount: '$2985.00',
      actionIcon: 'las la-sync-alt',
    },
  ]
}
