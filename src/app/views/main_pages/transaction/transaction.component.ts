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
  OnInit
} from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'
import { Router } from '@angular/router';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common'
import {
  NgbModal,
  NgbModalModule,
  NgbPaginationModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

export type SortColumn = keyof InvoiceDataType | ''
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
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = ''
  @Input() direction: SortDirection = ''
  @Output() sort = new EventEmitter<SortEvent>()

  rotate() {
    this.direction = rotate[this.direction]
    this.sort.emit({ column: this.sortable, direction: this.direction })
  }
}

interface InvoiceDataType {
  date: string;
  serie: string;
  folio: string;
  uuid: string;
  cliente: string;
  medioPago: string;
  concepto: string;
  importe: number;
  iva: number;
  total: number;
  status: string;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbModalModule,
    NgbDropdownModule,
    DatePipe,
    RouterModule
  ],
  templateUrl: './transaction.component.html',
  styles: [`
    .table > :not(caption) > * > * {
      padding: 1rem 0.75rem;
      font-size: 0.95rem;
    }

    .table thead th {
      font-size: 1rem;
      font-weight: 600;
    }

    .avatar-xs {
      width: 2rem;
      height: 2rem;
    }

    .avatar-title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 1rem;
      font-weight: 500;
    }

    .badge {
      padding: 0.5em 0.8em;
      font-size: 0.85rem;
    }

    .dropdown-menu {
      min-width: 10rem;
    }

    .dropdown-item {
      padding: 0.5rem 1rem;
      font-size: 0.95rem;
    }

    .dropdown-item i {
      font-size: 1.1rem;
    }
  `],
  providers: [DecimalPipe],
})
export class TransactionComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>
  
  // Datos
  invoiceData: InvoiceDataType[] = []
  filteredData: InvoiceDataType[] = []
  searchTerm: string = ''
  statusFilter: string = 'all'
  dateFilter: string = 'all'
  
  // Paginación
  currentPage: number = 1
  itemsPerPage: number = 10
  totalItems: number = 0
  totalPages: number = 0

  // Exponer Math para el template
  protected Math = Math

  private modalService = inject(NgbModal)

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadInvoices()
  }

  loadInvoices(): void {
    // Simulación de datos - Reemplazar con llamada real al servicio
    this.invoiceData = [
      {
        date: '2024-03-20',
        serie: 'A',
        folio: 'FAC-001',
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        cliente: 'Juan Pérez García',
        medioPago: 'Transferencia',
        concepto: 'Servicios de consultoría',
        importe: 1500.00,
        iva: 240.00,
        total: 1740.00,
        status: 'pagada'
      },
      {
        date: '2024-03-19',
        serie: 'A',
        folio: 'FAC-002',
        uuid: '123e4567-e89b-12d3-a456-426614174001',
        cliente: 'Empresa ABC, S.A. de C.V.',
        medioPago: 'Tarjeta',
        concepto: 'Desarrollo de software',
        importe: 3500.00,
        iva: 560.00,
        total: 4060.00,
        status: 'pendiente'
      },
      {
        date: '2024-03-18',
        serie: 'A',
        folio: 'FAC-003',
        uuid: '123e4567-e89b-12d3-a456-426614174002',
        cliente: 'María Rodríguez López',
        medioPago: 'Efectivo',
        concepto: 'Mantenimiento de sistemas',
        importe: 2800.00,
        iva: 448.00,
        total: 3248.00,
        status: 'cancelada'
      },
      {
        date: '2024-03-17',
        serie: 'A',
        folio: 'FAC-004',
        uuid: '123e4567-e89b-12d3-a456-426614174003',
        cliente: 'Constructora XYZ, S.A. de C.V.',
        medioPago: 'Transferencia',
        concepto: 'Servicios de arquitectura',
        importe: 8500.00,
        iva: 1360.00,
        total: 9860.00,
        status: 'pagada'
      },
      {
        date: '2024-03-16',
        serie: 'A',
        folio: 'FAC-005',
        uuid: '123e4567-e89b-12d3-a456-426614174004',
        cliente: 'Carlos Martínez Sánchez',
        medioPago: 'Tarjeta',
        concepto: 'Diseño de interiores',
        importe: 4200.00,
        iva: 672.00,
        total: 4872.00,
        status: 'pendiente'
      },
      {
        date: '2024-03-15',
        serie: 'A',
        folio: 'FAC-006',
        uuid: '123e4567-e89b-12d3-a456-426614174005',
        cliente: 'Restaurante El Buen Sabor',
        medioPago: 'Efectivo',
        concepto: 'Servicios de contabilidad',
        importe: 3200.00,
        iva: 512.00,
        total: 3712.00,
        status: 'pagada'
      },
      {
        date: '2024-03-14',
        serie: 'A',
        folio: 'FAC-007',
        uuid: '123e4567-e89b-12d3-a456-426614174006',
        cliente: 'Clínica Dental Sonrisa',
        medioPago: 'Transferencia',
        concepto: 'Sistema de gestión',
        importe: 6500.00,
        iva: 1040.00,
        total: 7540.00,
        status: 'cancelada'
      },
      {
        date: '2024-03-13',
        serie: 'A',
        folio: 'FAC-008',
        uuid: '123e4567-e89b-12d3-a456-426614174007',
        cliente: 'Distribuidora Comercial del Norte',
        medioPago: 'Tarjeta',
        concepto: 'Implementación de ERP',
        importe: 12000.00,
        iva: 1920.00,
        total: 13920.00,
        status: 'pagada'
      }
    ]
    this.filteredData = [...this.invoiceData]
    this.totalItems = this.invoiceData.length
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
  }

  searchName(event: Event): void {
    const search = (event.target as HTMLInputElement).value.toLowerCase()
    this.filteredData = this.invoiceData.filter(invoice => 
      invoice.folio.toLowerCase().includes(search) || 
      invoice.cliente.toLowerCase().includes(search) ||
      invoice.uuid.toLowerCase().includes(search)
    )
    this.updatePagination()
  }

  filterByStatus(event: Event): void {
    const status = (event.target as HTMLSelectElement).value
    this.statusFilter = status
    this.applyFilters()
  }

  filterByDate(event: Event): void {
    const date = (event.target as HTMLSelectElement).value
    this.dateFilter = date
    this.applyFilters()
  }

  applyFilters(): void {
    let filtered = [...this.invoiceData]

    // Aplicar filtro de estado
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(invoice => 
        invoice.status.toLowerCase() === this.statusFilter.toLowerCase()
      )
    }

    // Aplicar filtro de fecha
    if (this.dateFilter !== 'all') {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

      filtered = filtered.filter(invoice => {
        const invoiceDate = new Date(invoice.date)
        switch (this.dateFilter) {
          case 'today':
            return invoiceDate >= today
          case 'week':
            return invoiceDate >= weekStart
          case 'month':
            return invoiceDate >= monthStart
          default:
            return true
        }
      })
    }

    this.filteredData = filtered
    this.updatePagination()
  }

  updatePagination(): void {
    this.totalItems = this.filteredData.length
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
    this.currentPage = 1
  }

  getPages(): number[] {
    const pages: number[] = []
    const maxPages = 5
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2))
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1)

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
    }
  }

  viewInvoice(invoice: InvoiceDataType): void {
    // Implementar lógica para ver detalles de la factura
    console.log('Ver factura:', invoice)
  }

  downloadInvoice(invoice: InvoiceDataType): void {
    // Implementar lógica para descargar PDF
    console.log('Descargar factura:', invoice)
  }

  cancelInvoice(invoice: InvoiceDataType): void {
    // Implementar lógica para cancelar factura
    console.log('Cancelar factura:', invoice)
  }

  redirectionToDetail(): void {
    this.router.navigate(['/transaction/detail'])
  }
}
