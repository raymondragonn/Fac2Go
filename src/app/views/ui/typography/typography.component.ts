import { Component, type AfterViewInit } from '@angular/core'
import * as Prism from 'prismjs'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-typography',
  imports: [PagetitleComponent],
  templateUrl: './typography.component.html',
  styles: ``,
})
export class TypographyComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    Prism.highlightAll()
  }
}
