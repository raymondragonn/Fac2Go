import { currency } from '@/app/common/constants'
import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-basic',
  imports: [NgbDropdownModule, PagetitleComponent],
  templateUrl: './basic.component.html',
  styles: ``,
})
export class BasicComponent {
  currency = currency
}
