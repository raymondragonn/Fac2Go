import { Component } from '@angular/core'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-wizard',
  imports: [NgbNavModule, PagetitleComponent],
  templateUrl: './wizard.component.html',
  styles: ``,
})
export class WizardComponent {
  active = 1
  activeId = 1
}
