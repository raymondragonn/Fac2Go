import {
  Component,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  PipeTransform,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common'
import {
  NgbModal,
  NgbModalModule,
  NgbPaginationModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { invoicePendingData, InvoicePendingDataType } from './invoice-pending-data'

export type SortColumn = keyof  InvoicePendingDataType | ''
export type SortDirection = 'asc' | 'desc' | ''
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0

export interface SortEvent {
  column: SortColumn
  direction: SortDirection
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdCustomSortableHeader {
  @Input() sortable: SortColumn = ''
  @Input() direction: SortDirection = ''
  @Output() sort = new EventEmitter<SortEvent>()

  rotate() {
    this.direction = rotate[this.direction]
    this.sort.emit({ column: this.sortable, direction: this.direction })
  }
}


@Component({
  selector: 'app-pending-invoice-general',
  imports: [
    PagetitleComponent,
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbModalModule,
    NgbDropdownModule
  ],
  templateUrl: './pending-invoice.component.html',
  styles: ``,
  providers: [DecimalPipe],
})
export class PendingInvoiceComponentGeneral {
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
        NgbdSortableHeader<InvoicePendingDataType>
      >
      invoiceData = invoicePendingData
      allInvoiceData = invoicePendingData
      rowsToShow: number = 10
      filteredEntries: number = 0
      totalEntries: number = 0
      page = 1
      
      private modalService = inject(NgbModal)
  
    constructor(private router: Router) {}
  
    ngOnInit(): void {
      this.totalEntries = this.allInvoiceData.length
  
      this.updateDisplayedData()
    }
  
    onRowsChange(event: any): void {
      this.rowsToShow = +event.target.value
      this.updateDisplayedData()
    }
  
    updateDisplayedData() {
      this.invoiceData = this.allInvoiceData.slice(0, this.rowsToShow)
      this.filteredEntries = this.invoiceData.length
    }
  
    searchName(event: any): void {
      const searchTerm = event.target.value.toLowerCase();
    
      this.invoiceData = this.allInvoiceData.filter((item) => {
        return (
          item.uuid.toLowerCase().includes(searchTerm) ||
          item.cliente.toLowerCase().includes(searchTerm) ||
          item.medioPago.toLowerCase().includes(searchTerm) ||
          item.folio.toLowerCase().includes(searchTerm) ||
          item.date.toLowerCase().includes(searchTerm)
        );
      });
    
      this.filteredEntries = this.invoiceData.length;
    }
  
    redirectionToDetail(): void {
      this.router.navigate(['/apps/invoice']); // Ajusta la ruta y el parámetro según tus necesidades
    }
}
