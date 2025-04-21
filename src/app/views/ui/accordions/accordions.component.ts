import { Component } from '@angular/core'
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-accordions',
  imports: [
    NgbNavModule,
    NgbAccordionModule,
    NgbCollapseModule,
    PagetitleComponent,
  ],
  templateUrl: './accordions.component.html',
  styles: ``,
})
export class AccordionsComponent {
  isCollapsed = false
}
