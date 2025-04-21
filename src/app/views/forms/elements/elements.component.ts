import { credits, currency } from '@/app/common/constants'
import { Component } from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-elements',
  imports: [PagetitleComponent],
  templateUrl: './elements.component.html',
  styles: ``,
})
export class ElementsComponent {
  currency = currency
  credits = credits
}
