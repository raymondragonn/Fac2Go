import {
  Component,
  Directive,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'
import { taxes, TaxesType } from './data'
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'
import { FormsModule } from '@angular/forms'
export type SortColumn = keyof TaxesComponent | ''
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
  selector: 'app-taxes',
  imports: [
    PagetitleComponent,
    NgbdSortableHeader,
    FormsModule,
    NgbModalModule,
  ],
  templateUrl: './taxes.component.html',
  styles: ``,
})
export class TaxesComponent {
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<TaxesType>
  >
  taxesData = taxes
  alltaxesData = taxes

  rowsToShow: number = 5
  filteredEntries: number = 0
  totalEntries: number = 0
  page = 1
  private modalService = inject(NgbModal)

  ngOnInit(): void {
    this.totalEntries = this.alltaxesData.length

    this.updateDisplayedData()
  }

  onRowsChange(event: any): void {
    this.rowsToShow = +event.target.value
    this.updateDisplayedData()
  }

  updateDisplayedData() {
    this.taxesData = this.alltaxesData.slice(0, this.rowsToShow)
    this.filteredEntries = this.taxesData.length
  }

  searchName(event: any): void {
    const searchTerm = event.target.value.toLowerCase()
    this.taxesData = this.alltaxesData.filter((item) =>
      item.description.toLowerCase().includes(searchTerm)
    )
    this.filteredEntries = this.taxesData.length
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
