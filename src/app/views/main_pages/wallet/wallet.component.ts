import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '@/app/core/service/auth.service';

interface Client {
  id: string;
  name: string;
  rfc: string;
  lastInvoice: Date;
  invoiceCount: number;
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styles: [`
    .client-card {
      transition: all 0.3s ease;
      cursor: pointer;
      border: 1px solid rgba(0,0,0,0.1);
    }
    
    .client-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      border-color: var(--bs-primary);
    }

    .new-invoice-card {
      transition: all 0.3s ease;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .new-invoice-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .new-invoice-btn {
      transition: all 0.3s ease;
      background-color: #0da684;
      border: none;
      color: #fff;
      padding: 2rem;
    }

    .new-invoice-btn:hover {
      background-color: shade(#0da684, 10%);
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(13, 166, 132, 0.3);
    }

    .new-invoice-btn:active {
      transform: scale(0.98);
    }

    .new-invoice-btn small {
      display: block;
      font-weight: 500;
      color: #fff !important;
      text-shadow: 0 0 1px rgba(0,0,0,0.3);
    }

    .new-invoice-btn:hover small {
      color: #fff !important;
    }

    .new-invoice-btn i {
      transition: transform 0.3s ease;
      color: #fff;
    }

    .new-invoice-btn:hover i {
      transform: scale(1.15);
    }

    .client-avatar {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .badge {
      font-size: 0.8rem;
      padding: 0.5em 0.8em;
    }

    .card-title {
      font-size: 1.1rem;
      font-weight: 600;
    }

    .btn-sm {
      padding: 0.4rem 0.8rem;
      font-size: 0.85rem;
    }

    .empty-state img {
      opacity: 0.5;
    }

    .input-group .input-group-text {
      border-right: none;
    }
    
    .input-group .form-control {
      border-left: none;
    }
    
    .input-group .form-control:focus {
      box-shadow: none;
      border-color: #ced4da;
    }

    .form-select:focus {
      box-shadow: none;
      border-color: #ced4da;
    }
  `],
  standalone: true,
  imports: [FormsModule, DatePipe, CommonModule, RouterModule]
})
export class WalletComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';
  sortBy: string = 'name';
  filterBy: string = 'all';

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadClients();
  }



  loadClients(): void {
    this.authService.getClientes().subscribe(
      (data: any) => {
        this.clients = data.map((client: any) => ({
          id: client.id_Cliente,
          name: client.nombre_RazonSocial,
          rfc: client.rfc,
          lastInvoice: client.fecha_Registro
          ? new Date(client.fecha_Registro[0], client.fecha_Registro[1] - 1, client.fecha_Registro[2])
          : new Date(),
          invoiceCount: 0
        }))
        this.filteredClients = [...this.clients];
        console.log(this.clients);
      }
    )
    // this.clients = [
    //   {
    //     id: '1',
    //     name: 'Juan Pérez García',
    //     rfc: 'XAXX010101000',
    //     lastInvoice: new Date('2024-03-15'),
    //     invoiceCount: 5
    //   },
    //   {
    //     id: '2',
    //     name: 'Empresa ABC, S.A. de C.V.',
    //     rfc: 'XAXX020202000',
    //     lastInvoice: new Date('2024-03-10'),
    //     invoiceCount: 12
    //   },
    //   {
    //     id: '3',
    //     name: 'María Rodríguez López',
    //     rfc: 'XAXX030303000',
    //     lastInvoice: new Date('2024-03-18'),
    //     invoiceCount: 3
    //   },
    //   {

        
    //     id: '4',
    //     name: 'Tecnologías XYZ, S.A.P.I. de C.V.',
    //     rfc: 'XAXX040404000',
    //     lastInvoice: new Date('2024-02-28'),
    //     invoiceCount: 8
    //   },
    //   {
    //     id: '5',
    //     name: 'Carlos Martínez Sánchez',
    //     rfc: 'XAXX050505000',
    //     lastInvoice: new Date('2024-03-01'),
    //     invoiceCount: 2
    //   },
    //   {
    //     id: '6',
    //     name: 'Servicios Profesionales del Norte, S.C.',
    //     rfc: 'XAXX060606000',
    //     lastInvoice: new Date('2024-03-20'),
    //     invoiceCount: 15
    //   },
    //   {
    //     id: '7',
    //     name: 'Ana González Hernández',
    //     rfc: 'XAXX070707000',
    //     lastInvoice: new Date('2024-02-15'),
    //     invoiceCount: 4
    //   },
    //   {
    //     id: '8',
    //     name: 'Consultores Asociados, S.A. de C.V.',
    //     rfc: 'XAXX080808000',
    //     lastInvoice: new Date('2024-03-05'),
    //     invoiceCount: 10
    //   },
    //   {
    //     id: '9',
    //     name: 'Roberto Silva Mendoza',
    //     rfc: 'XAXX090909000',
    //     lastInvoice: new Date('2024-03-12'),
    //     invoiceCount: 6
    //   },
    //   {
    //     id: '10',
    //     name: 'Distribuidora Comercial del Sur, S.A. de C.V.',
    //     rfc: 'XAXX101010000',
    //     lastInvoice: new Date('2024-03-17'),
    //     invoiceCount: 9
    //   }
    // ];
    
  }

  filterClients(): void {
    let filtered = [...this.clients];

    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(client => 
        client.name.toLowerCase().includes(search) || 
        client.rfc.toLowerCase().includes(search)
      );
    }

    if (this.filterBy === 'recent') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(client => client.lastInvoice >= thirtyDaysAgo);
    } else if (this.filterBy === 'old') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = filtered.filter(client => client.lastInvoice < thirtyDaysAgo);
    }

    this.sortClients(filtered);
  }

  sortClients(clients: Client[] = this.filteredClients): void {
    switch (this.sortBy) {
      case 'name':
        clients.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'lastInvoice':
        clients.sort((a, b) => b.lastInvoice.getTime() - a.lastInvoice.getTime());
        break;
      case 'rfc':
        clients.sort((a, b) => a.rfc.localeCompare(b.rfc));
        break;
    }
    this.filteredClients = clients;
  }

  selectClient(client: Client): void {
    this.router.navigate(['/issuance/principal'], {
      queryParams: {
        clientId: client.id,
        rfc: client.rfc,
        name: client.name
      }
    });
  }

  redirectionToPrincipal(): void {
    this.router.navigate(['/issuance/principal']);
  }
}
