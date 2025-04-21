import { Component } from '@angular/core'
import { pricingData, pricingIconData } from './data'
import { CommonModule } from '@angular/common'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-pricing',
  imports: [CommonModule, PagetitleComponent],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent {
  pricingData = pricingData
  pricingIconData = pricingIconData
}
