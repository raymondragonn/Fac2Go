import { Component } from '@angular/core'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-alerts',
  imports: [NgbAlertModule, PagetitleComponent],
  templateUrl: './alerts.component.html',
  styles: ``,
})
export class AlertsComponent {
  staticAlertClosed = true
  dismissALer1 = true
  dismissALer2 = true
  dismissALer3 = true
  dismissALer4 = true
}
