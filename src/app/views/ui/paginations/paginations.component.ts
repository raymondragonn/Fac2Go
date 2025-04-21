import { Component } from '@angular/core'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-paginations',
  imports: [NgbPaginationModule, PagetitleComponent],
  templateUrl: './paginations.component.html',
  styles: ``,
})
export class PaginationsComponent {}
