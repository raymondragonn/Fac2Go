import { Component, Input } from '@angular/core'

@Component({
  selector: 'pagetitle',
  imports: [],
  templateUrl: './pagetitle.component.html',
  styles: ``,
})
export class PagetitleComponent {
  @Input() title: string = ''
  @Input() subtitle: string = ''
}
