import { Component } from '@angular/core'
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-popover',
  imports: [NgbPopoverModule, NgbTooltipModule, PagetitleComponent],
  templateUrl: './popover.component.html',
  styles: ``,
})
export class PopoverComponent {}
