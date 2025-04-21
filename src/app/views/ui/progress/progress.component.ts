import { Component } from '@angular/core'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-progress',
  imports: [NgbProgressbarModule, PagetitleComponent],
  templateUrl: './progress.component.html',
  styles: ``,
})
export class ProgressComponent {}
