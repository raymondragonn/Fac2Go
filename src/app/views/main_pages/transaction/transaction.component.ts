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
import { AuthenticationService } from '@/app/core/service/auth.service';

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
  usuarioCorreo: any = null

  // Exponer Math para el template
  protected Math = Math

  private modalService = inject(NgbModal)
  userType: any;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    // this.loadInvoices()
    this.userType = localStorage.getItem('userType');
    this.authService.getCurrentUser().subscribe(
      (user: any) => {
        console.log(user.correo);
        this.usuarioCorreo = user.correo;
        
      }
    )
    console.log(this.userType);
    if(this.userType === 'admin'){
      this.loadInvoices1()
    }else{
      this.loadInvoices2()
    }
  
  }
  pagedData(): InvoiceDataType[] {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  return this.filteredData.slice(start, end);
}

  loadInvoices1(){
    this.authService.getAllFacturas().subscribe(
      (data: any) => {
        console.log(data);
        this.invoiceData = data.map((item: any, idx: number) => ({
          date: item.Fecha_Emision
            ? `${item.Fecha_Emision[0]}-${String(item.Fecha_Emision[1]).padStart(2, '0')}-${String(item.Fecha_Emision[2]).padStart(2, '0')}`
            : '',
          serie: item.Num_Serie || 'A',
          folio: item.Folio || `FAC-${String(idx + 1).padStart(3, '0')}`,
          uuid: item.UUID || item.id_Cliente || '',
          cliente: item.Nombre_RazonSocial || '',
          medioPago: 'Transferencia',
          importe: Number(item.SubTotal) || 0,
          iva: Number(item.IVA) || 0,
          total: Number(item.total) || 0,
          status: 'pagada'
        }));
    
        this.applyFilters();
       
        }
      );

  }

  loadInvoices2(){
    this.authService.getFacturas(this.usuarioCorreo).subscribe(
      (data: any) => {
        console.log(data);
        this.invoiceData = data.map((item: any, idx: number) => ({
          date: item.Fecha_Emision
            ? `${item.Fecha_Emision[0]}-${String(item.Fecha_Emision[1]).padStart(2, '0')}-${String(item.Fecha_Emision[2]).padStart(2, '0')}`
            : '',
          serie: item.Num_Serie || 'A',
          folio: item.Folio || `FAC-${String(idx + 1).padStart(3, '0')}`,
          uuid: item.UUID || item.id_Cliente || '',
          cliente: item.Nombre_RazonSocial || '',
          medioPago: 'Transferencia',
          importe: Number(item.SubTotal) || 0,
          iva: Number(item.IVA) || 0,
          total: Number(item.total) || 0,
          status: 'pagada'
        }));
    
        this.applyFilters();
       
        }
      );

  }
  

  searchName(event: Event): void {
    const search = (event.target as HTMLInputElement).value.toLowerCase()
    this.filteredData = this.invoiceData.filter(invoice => 
      invoice.folio.toLowerCase().includes(search) || 
      invoice.cliente.toLowerCase().includes(search) ||
      invoice.uuid.toLowerCase().includes(search)
    )
    this.updatePagination(true)
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

  updatePagination(resetPage: boolean = false): void {
  this.totalItems = this.filteredData.length;
  this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  if (resetPage) {
    this.currentPage = 1;
  }
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
      this.currentPage = page;
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
