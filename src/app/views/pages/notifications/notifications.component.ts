import { Component } from '@angular/core'
import { AlertComponent } from './components/alert/alert.component'
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-notifications',
  imports: [AlertComponent, NotificationDetailComponent, PagetitleComponent],
  templateUrl: './notifications.component.html',
  styles: ``,
})
export class NotificationsComponent {}
