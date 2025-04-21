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
import { UserDataType, usersData } from './data'
import { CommonModule, DecimalPipe } from '@angular/common'
import {
  NgbModal,
  NgbModalModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { NgbdSortableHeader } from '@/app/core/directive/sortable.directive'

export type SortColumn = keyof UserDataType | ''
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
  selector: 'app-users',
  imports: [
    PagetitleComponent,
    NgbdSortableHeader,
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbModalModule,
  ],
  templateUrl: './users.component.html',
  styles: ``,
  providers: [DecimalPipe],
})
export class UsersComponent {
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<
    NgbdSortableHeader<UserDataType>
  >
  usersData = usersData
  allusersData = usersData
  rowsToShow: number = 10
  filteredEntries: number = 0
  totalEntries: number = 0
  page = 1
  private modalService = inject(NgbModal)

  ngOnInit(): void {
    this.totalEntries = this.allusersData.length

    this.updateDisplayedData()
  }

  onRowsChange(event: any): void {
    this.rowsToShow = +event.target.value
    this.updateDisplayedData()
  }

  updateDisplayedData() {
    this.usersData = this.allusersData.slice(0, this.rowsToShow)
    this.filteredEntries = this.usersData.length
  }

  searchName(event: any): void {
    const searchTerm = event.target.value.toLowerCase()
    this.usersData = this.allusersData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    )
    this.filteredEntries = this.usersData.length
  }

  onSort({ column, direction }: SortEvent) {
    // Resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = ''
      }
    })
    if (direction === '' || column === '') {
      this.usersData = usersData
    } else {
      this.usersData = [...usersData].sort((a, b) => {
        const res = compare(a[column], b[column])
        return direction === 'asc' ? res : -res
      })
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content)
  }
}
