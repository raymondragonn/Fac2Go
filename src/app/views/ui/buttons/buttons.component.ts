import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-buttons',
  imports: [NgbDropdownModule, PagetitleComponent],
  templateUrl: './buttons.component.html',
  styles: ``,
})
export class ButtonsComponent {}
