import { ListreeDirective } from '@/app/core/directive/listree.directive'
import { Component } from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-treeview',
  imports: [ListreeDirective, PagetitleComponent],
  templateUrl: './treeview.component.html',
  styles: ``,
})
export class TreeviewComponent {}
