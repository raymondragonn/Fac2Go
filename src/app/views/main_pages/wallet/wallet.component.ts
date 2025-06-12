import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '@/app/core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

interface Client {
  id: string;
  name: string;
  rfc: string;
  lastInvoice: Date;
  invoiceCount: number;
  fechaRegistro: Date;
  tipoCliente: 'Persona Física' | 'Persona Moral';
  iniciales: string;
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
      font-weight: 600;
      font-size: 1.2rem;
      color: #fff;
      background: linear-gradient(135deg, #2DC1A4, #25a08c);
      border-radius: 50%;
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
  sortBy: string = 'recentlyAdded';
  filterBy: string = 'all';
  usuarioCorreo: any;
  idUsuario: any;
  idNombreUsuario: any;

  constructor(private router: Router, private authService: AuthenticationService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user: any) => {
      console.log(user.correo);
      this.usuarioCorreo = user.correo;
      this.loadClients();
      this.authService.getUseridByCorreo(this.usuarioCorreo).subscribe((data: any) => {
        this.idUsuario = data.id;
        this.idNombreUsuario = data.nombre;
      })
    })
    
    
    
  }

  private getInitials(name: string, tipoCliente: 'Persona Física' | 'Persona Moral'): string {
    if (tipoCliente === 'Persona Moral') {
      // Para personas morales, tomar las primeras dos letras del nombre
      return name.substring(0, 2).toUpperCase();
    } else {
      // Para personas físicas, tomar la primera letra de cada nombre y apellido
      const parts = name.split(' ');
      if (parts.length >= 3) {
        // Si tiene nombre y dos apellidos
        return (parts[0][0] + parts[1][0] + parts[2][0]).toUpperCase();
      } else if (parts.length === 2) {
        // Si solo tiene nombre y un apellido
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      // Si solo tiene un nombre
      return name.substring(0, 2).toUpperCase();
    }
  }

  loadClients(): void {
    let correo = this.usuarioCorreo;
    this.authService.getClientesBycorreo(correo).subscribe(
      (data: any) => {
        this.clients = data.map((client: any) => {
          const tipoCliente = client.rfc.length === 12 ? 'Persona Moral' : 'Persona Física';
          const fechaRegistro = client.fecha_Registro
            ? new Date(
                client.fecha_Registro[0],
                client.fecha_Registro[1] - 1,
                client.fecha_Registro[2],
                0, 0, 0
              )
            : new Date();
          return {
            id: client.id_Cliente,
            name: client.nombre_RazonSocial,
            rfc: client.rfc,
            lastInvoice: fechaRegistro,
            invoiceCount: 0,
            fechaRegistro: fechaRegistro,
            tipoCliente: tipoCliente,
            iniciales: this.getInitials(client.nombre_RazonSocial, tipoCliente)
          };
        });
        this.filteredClients = [...this.clients];
        this.sortClients();
      }
    );
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
    } else if (this.filterBy === 'personaFisica') {
      filtered = filtered.filter(client => client.tipoCliente === 'Persona Física');
    } else if (this.filterBy === 'personaMoral') {
      filtered = filtered.filter(client => client.tipoCliente === 'Persona Moral');
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
      case 'recentlyAdded':
        clients.sort((a, b) => b.fechaRegistro.getTime() - a.fechaRegistro.getTime());
        break;
    }
    this.filteredClients = clients;
  }

  selectClient(client: Client): void {
    this.router.navigate(['/show-ticket'], {
      queryParams: {
        clientId: client.id,
        rfc: client.rfc,
        name: client.name,
        tipoCliente: client.tipoCliente
      }
    });
  }

  redirectionToNewClient(): void {
    this.router.navigate(['/new-client']);
  }

  deleteClient(client: Client): void {
    
    if (confirm(`¿Está seguro que desea eliminar al cliente ${client.name}?`)) {
      this.authService.deleteCliente(client.id).subscribe((data: any) => {
      let auditoria = {
          accion: 'Cliente Eliminado',
          id_Usuario: this.idUsuario,
          usuarioName: this.idNombreUsuario,
          id_Cliente: client.id,
          clienteName: client.name 
        }
        this.authService.setAuditoria(auditoria).subscribe((data: any) => {
          this.toastr.success('Cliente eliminado exitosamente', 'Éxito');
          this.loadClients();
        });
        
      }
        
      );
    }
  }
}
