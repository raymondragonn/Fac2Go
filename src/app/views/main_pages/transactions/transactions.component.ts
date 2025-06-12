import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '@/app/core/service/auth.service';

interface TransactionType {
  id_Auditoria: string;
  accion: string;
  fechaMovimiento: string;
  id_Usuario: string;
  usuarioName: string;
  id_Cliente: string;
  clienteName: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbPaginationModule
  ],
  templateUrl: './transactions.component.html',
  styles: [`
    .table > :not(caption) > * > * {
      padding: 1rem 0.75rem;
      font-size: 0.95rem;
    }

    .table thead th {
      font-size: 1rem;
      font-weight: 600;
    }

    .badge {
      padding: 0.5em 0.8em;
      font-size: 0.85rem;
    }

    .status-badge {
      padding: 0.4em 0.8em;
      border-radius: 4px;
      font-size: 0.85rem;
    }

    .status-success {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .status-warning {
      background-color: #fff3e0;
      color: #ef6c00;
    }

    .status-error {
      background-color: #ffebee;
      color: #c62828;
    }

    .client-avatar {
      width: 32px;
      height: 32px;
      background-color: #e3f2fd;
      color: #1976d2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
    }
  `]
})
export class TransactionsComponent implements OnInit {
  transactions: TransactionType[] = [];
  filteredData: TransactionType[] = [];
  searchTerm: string = '';
  dateFilter: string = 'all';
  
  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  
  // Exponer Math para el template
  protected Math = Math;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    // Obtener el tipo de usuario del localStorage
    const userType = localStorage.getItem('userType');
    
    if (userType === 'admin') {
      // Si es admin, cargar todas las transacciones
      this.authService.getAuditoria().subscribe(
        (response: any) => {
          console.log('Datos de auditoría:', response);
          this.transactions = response.data;
          this.applyFilters();
        },
        (error) => {
          console.error('Error al cargar auditoría:', error);
        }
      );
    }
  }

  formatDate(fecha: string): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }
  
  pagedData(): TransactionType[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  searchTransactions(event: Event): void {
    const search = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.transactions.filter(transaction => 
      transaction.usuarioName.toLowerCase().includes(search) || 
      transaction.accion.toLowerCase().includes(search) ||
      (transaction.clienteName && transaction.clienteName.toLowerCase().includes(search))
    );
    this.updatePagination(true);
  }

  filterByDate(event: Event): void {
    const date = (event.target as HTMLSelectElement).value;
    this.dateFilter = date;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.transactions];
  
    if (this.dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.fechaMovimiento);
  
        switch (this.dateFilter) {
          case 'today':
            return transactionDate >= today;
          case 'week':
            return transactionDate >= weekStart;
          case 'month':
            return transactionDate >= monthStart;
          default:
            return true;
        }
      });
    }
  
    this.filteredData = filtered;
    this.updatePagination();
  }
  

  updatePagination(resetPage: boolean = false): void {
    this.totalItems = this.filteredData.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (resetPage) {
      this.currentPage = 1;
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
