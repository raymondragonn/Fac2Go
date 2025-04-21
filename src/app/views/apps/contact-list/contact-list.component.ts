import { Component } from '@angular/core'
import { ContactFilterComponent } from './components/contact-filter/contact-filter.component'
import { ContactTableComponent } from './components/contact-table/contact-table.component'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-contact-list',
  imports: [ContactFilterComponent, ContactTableComponent, PagetitleComponent],
  templateUrl: './contact-list.component.html',
  styles: ``,
})
export class ContactListComponent {}
