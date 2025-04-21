import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-starter',
  imports: [NgbDropdownModule, PagetitleComponent],
  templateUrl: './starter.component.html',
  styles: ``,
})
export class StarterComponent {}
