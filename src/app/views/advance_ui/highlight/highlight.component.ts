import { Component, type AfterViewInit } from '@angular/core'
import * as Prism from 'prismjs'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'
@Component({
  selector: 'app-highlight',
  imports: [PagetitleComponent],
  templateUrl: './highlight.component.html',
  styles: ``,
})
export class HighlightComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    Prism.highlightAll()
  }
}
