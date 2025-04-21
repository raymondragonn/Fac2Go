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
import { ClientsDataType, clientsData } from './dataClients'
import { CommonModule, DecimalPipe } from '@angular/common'
import {
  NgbModal,
  NgbModalModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'

export type SortColumn = keyof ClientsDataType | ''
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
  selector: 'app-clients',
  imports: [
    PagetitleComponent,
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbModalModule,
  ],
  templateUrl: './clients.component.html',
  styles: ``,
  providers: [DecimalPipe],
})
export class ClientsComponent {
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<ClientsDataType>
  >
  clientsData = clientsData
  allclientsData = clientsData
  rowsToShow: number = 10
  filteredEntries: number = 0
  totalEntries: number = 0
  page = 1
  private modalService = inject(NgbModal)

  ngOnInit(): void {
    this.totalEntries = this.allclientsData.length

    this.updateDisplayedData()
  }

  onRowsChange(event: any): void {
    this.rowsToShow = +event.target.value
    this.updateDisplayedData()
  }

  updateDisplayedData() {
    this.clientsData = this.allclientsData.slice(0, this.rowsToShow)
    this.filteredEntries = this.clientsData.length
  }

  searchName(event: any): void {
    const searchTerm = event.target.value.toLowerCase()
    this.clientsData = this.allclientsData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    )
    this.filteredEntries = this.clientsData.length
  }

  /*onSort({ column, direction }: SortEvent) {
    // Resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = ''
      }
    })
    if (direction === '' || column === '') {
      this.clientsData = clientsData
    } else {
      this.clientsData = [...clientsData].sort((a, b) => {
        const res = compare(a[column], b[column])
        return direction === 'asc' ? res : -res
      })
    }
  }*/

  open(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
