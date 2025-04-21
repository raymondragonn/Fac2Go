import { Component } from '@angular/core'
import { InvoiceData } from './data'
import { AddressComponent } from './components/address/address.component'
import { InvoiceProductComponent } from './components/invoice-product/invoice-product.component'
import { InvoiceTermsComponent } from './components/invoice-terms/invoice-terms.component'
import { currentYear } from '@/app/common/constants'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-invoice',
  imports: [
    AddressComponent,
    InvoiceProductComponent,
    InvoiceTermsComponent,
    PagetitleComponent,
  ],
  templateUrl: './invoice.component.html',
  styles: ``,
})
export class InvoiceComponent {
  currentYear = currentYear
}
