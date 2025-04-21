import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-dropdowns',
  imports: [NgbDropdownModule, PagetitleComponent],
  templateUrl: './dropdowns.component.html',
  styles: ``,
})
export class DropdownsComponent {}
