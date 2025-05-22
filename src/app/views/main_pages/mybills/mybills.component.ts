import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Bill {
  id: string;
  folio: string;
  clientName: string;
  rfc: string;
  date: Date;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-mybills',
  templateUrl: './mybills.component.html',
  styles: [`
    .table > :not(caption) > * > * {
      padding: 1rem 0.75rem;
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
      font-size: 0.875rem;
      font-weight: 500;
    }

    .badge {
      padding: 0.5em 0.8em;
      font-size: 0.75rem;
    }

    .dropdown-menu {
      min-width: 10rem;
    }

    .dropdown-item {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .dropdown-item i {
      font-size: 1rem;
    }
  `],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class MybillsComponent implements OnInit {
  bills: Bill[] = [];
  filteredBills: Bill[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';
  dateFilter: string = 'all';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    // Simulación de datos - Reemplazar con llamada real al servicio
    this.bills = [
      {
        id: '1',
        folio: 'FAC-001',
        clientName: 'Juan Pérez García',
        rfc: 'XAXX010101000',
        date: new Date('2024-03-20T10:30:00'),
        amount: 1500.00,
        status: 'Pagada'
      },
      {
        id: '2',
        folio: 'FAC-002',
        clientName: 'Empresa ABC, S.A. de C.V.',
        rfc: 'XAXX020202000',
        date: new Date('2024-03-19T15:45:00'),
        amount: 3500.00,
        status: 'Pendiente'
      },
      {
        id: '3',
        folio: 'FAC-003',
        clientName: 'María Rodríguez López',
        rfc: 'XAXX030303000',
        date: new Date('2024-03-18T09:15:00'),
        amount: 2800.00,
        status: 'Cancelada'
      },
      {
        id: '4',
        folio: 'FAC-004',
        clientName: 'Tecnologías XYZ, S.A.P.I. de C.V.',
        rfc: 'XAXX040404000',
        date: new Date('2024-03-17T14:20:00'),
        amount: 5200.00,
        status: 'Pagada'
      },
      {
        id: '5',
        folio: 'FAC-005',
        clientName: 'Carlos Martínez Sánchez',
        rfc: 'XAXX050505000',
        date: new Date('2024-03-16T11:00:00'),
        amount: 1800.00,
        status: 'Pendiente'
      }
    ];
    this.filteredBills = [...this.bills];
  }

  filterBills(): void {
    let filtered = [...this.bills];

    // Aplicar búsqueda
    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(bill => 
        bill.folio.toLowerCase().includes(search) || 
        bill.clientName.toLowerCase().includes(search)
      );
    }

    // Aplicar filtro de estado
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(bill => 
        bill.status.toLowerCase() === this.statusFilter.toLowerCase()
      );
    }

    // Aplicar filtro de fecha
    if (this.dateFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

      filtered = filtered.filter(bill => {
        const billDate = new Date(bill.date);
        switch (this.dateFilter) {
          case 'today':
            return billDate >= today;
          case 'week':
            return billDate >= weekStart;
          case 'month':
            return billDate >= monthStart;
          default:
            return true;
        }
      });
    }

    this.filteredBills = filtered;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pagada':
        return 'bg-success-subtle text-success';
      case 'pendiente':
        return 'bg-warning-subtle text-warning';
      case 'cancelada':
        return 'bg-danger-subtle text-danger';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }

  viewBill(bill: Bill): void {
    // Implementar lógica para ver detalles de la factura
    console.log('Ver factura:', bill);
  }

  downloadBill(bill: Bill): void {
    // Implementar lógica para descargar PDF
    console.log('Descargar factura:', bill);
  }

  cancelBill(bill: Bill): void {
    // Implementar lógica para cancelar factura
    console.log('Cancelar factura:', bill);
  }
}
