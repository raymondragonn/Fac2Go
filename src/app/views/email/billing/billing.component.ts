import { credits, currency } from '@/app/common/constants'
import { Component } from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-billing',
  imports: [PagetitleComponent],
  templateUrl: './billing.component.html',
  styles: ``,
})
export class BillingComponent {
  currency = currency
  credits = credits
}
