import { Component } from '@angular/core'
import { blogData } from './data'
import { CommonModule } from '@angular/common'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, PagetitleComponent],
  templateUrl: './blogs.component.html',
  styles: ``,
})
export class BlogsComponent {
  blogData = blogData
}
