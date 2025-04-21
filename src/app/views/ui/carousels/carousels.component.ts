import { Component } from '@angular/core'
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-carousels',
  imports: [NgbCarouselModule, PagetitleComponent],
  templateUrl: './carousels.component.html',
  styles: ``,
})
export class CarouselsComponent {}
