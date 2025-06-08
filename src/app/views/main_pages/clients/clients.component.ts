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
  OnInit
} from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'
import { CommonModule, DecimalPipe } from '@angular/common'
import {
  NgbModal,
  NgbModalModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { AuthenticationService } from '@/app/core/service/auth.service'
import { ToastrService } from 'ngx-toastr'

interface Client {
  id: string;
  name: string;
  rfc: string;
  lastInvoice: Date;
  invoiceCount: number;
  fechaRegistro: Date;
  tipoCliente: 'Persona Física' | 'Persona Moral';
  iniciales: string;
  email?: string;
  phone?: string;
  direccion?: string;
  representanteLegal?: string;
  date?: string;
  CURP?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  razonSocial?: string;
}

@Component({
  selector: 'app-clients',
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbModalModule,
  ],
  templateUrl: './clients.component.html',
  styles: [`
    .table > :not(caption) > * > * {
      padding: 1rem 0.75rem;
      font-size: 0.95rem;
    }

    .table thead th {
      font-size: 1rem;
      font-weight: 600;
    }

    .client-avatar {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1rem;
      color: #fff;
      background: linear-gradient(135deg, #2DC1A4, #25a08c);
      border-radius: 50%;
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

    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }

    .btn-sm i {
      font-size: 0.875rem;
    }
  `],
  providers: [DecimalPipe],
})
export class ClientsComponent implements OnInit {
  clientsData: Client[] = [];
  allclientsData: Client[] = [];
  rowsToShow: number = 10;
  filteredEntries: number = 0;
  totalEntries: number = 0;
  page = 1;
  private modalService = inject(NgbModal);
  private authService = inject(AuthenticationService);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadClients();
  }

  private getInitials(name: string, tipoCliente: 'Persona Física' | 'Persona Moral'): string {
    if (tipoCliente === 'Persona Moral') {
      return name.substring(0, 2).toUpperCase();
    } else {
      const parts = name.split(' ');
      if (parts.length >= 3) {
        return (parts[0][0] + parts[1][0] + parts[2][0]).toUpperCase();
      } else if (parts.length === 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
  }

  loadClients(): void {
    this.authService.getClientes().subscribe(
      (data: any) => {
        this.clientsData = data.map((client: any) => {
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
            iniciales: this.getInitials(client.nombre_RazonSocial, tipoCliente),
            email: client.email || '',
            phone: client.telefono || '',
            direccion: client.direccion || '',
            representanteLegal: client.representanteLegal || '',
            date: client.fechaNacimiento || '',
            CURP: client.curp || '',
            apellidoPaterno: client.apellidoPaterno || '',
            apellidoMaterno: client.apellidoMaterno || '',
            razonSocial: client.razonSocial || ''
          };
        });
        this.allclientsData = [...this.clientsData];
        this.totalEntries = this.allclientsData.length;
        this.updateDisplayedData();
      },
      (error) => {
        this.toastr.error('Error al cargar los clientes', 'Error');
      }
    );
  }

  onRowsChange(event: any): void {
    this.rowsToShow = +event.target.value;
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    this.clientsData = this.allclientsData.slice(0, this.rowsToShow);
    this.filteredEntries = this.clientsData.length;
  }

  searchName(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.clientsData = this.allclientsData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.rfc.toLowerCase().includes(searchTerm)
    );
    this.filteredEntries = this.clientsData.length;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  editClient(client: Client): void {
    // TODO: Implementar la lógica de edición
    console.log('Editando cliente:', client);
  }

  deleteClient(client: Client): void {
    if (confirm(`¿Está seguro que desea eliminar al cliente ${client.name}?`)) {
      this.authService.deleteCliente(client.id).subscribe(
        () => {
          this.toastr.success('Cliente eliminado exitosamente', 'Éxito');
          this.loadClients(); // Recargar la lista de clientes
        },
        (error) => {
          this.toastr.error('Error al eliminar el cliente', 'Error');
        }
      );
    }
  }
}
