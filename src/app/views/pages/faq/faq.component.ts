import { Component } from '@angular/core'
import { faqAccordionData, faqData } from './data'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-faq',
  imports: [NgbAccordionModule, PagetitleComponent],
  templateUrl: './faq.component.html',
  styles: ``,
})
export class FaqComponent {
  faqData = faqData
  faqAccordionData = faqAccordionData
}
