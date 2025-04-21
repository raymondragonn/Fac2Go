import { currentYear } from '@/app/common/constants'
import { Component } from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-cards',
  imports: [PagetitleComponent],
  templateUrl: './cards.component.html',
  styles: ``,
})
export class CardsComponent {
  currentYear = currentYear
}
