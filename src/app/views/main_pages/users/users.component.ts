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
  OnInit,
  ViewChild
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

interface User {
  id: string;
  name: string;
  email: string;
  rfc: string;
  regimenFiscal: string;
  codigoPostal: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  iniciales: string;
  contraseña: string;
}

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    NgbModalModule,
  ],
  templateUrl: './users.component.html',
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

    .text-decoration-underline {
      text-decoration: none !important;
    }

    .text-decoration-underline:hover {
      text-decoration: underline !important;
    }

    .card {
      border: none;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    }

    .card-header {
      background-color: #f8f9fa;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
    }

    .form-control, .form-select {
      border-color: #dee2e6;
    }

    .form-control:focus, .form-select:focus {
      border-color: #2DC1A4;
      box-shadow: 0 0 0 0.2rem rgba(45, 193, 164, 0.25);
    }

    .input-group-text {
      background-color: #f8f9fa;
      border-color: #dee2e6;
    }

    .btn-light {
      background-color: #f8f9fa;
      border-color: #dee2e6;
    }

    .btn-light:hover {
      background-color: #e9ecef;
      border-color: #dee2e6;
    }

    .table-hover tbody tr:hover {
      background-color: rgba(45, 193, 164, 0.05);
    }
  `],
  providers: [DecimalPipe],
})
export class UsersComponent implements OnInit {
  usersData: User[] = [];
  allusersData: User[] = [];
  rowsToShow: number = 10;
  filteredEntries: number = 0;
  totalEntries: number = 0;
  page = 1;
  private modalService = inject(NgbModal);
  private authService = inject(AuthenticationService);
  private toastr = inject(ToastrService);

  // Variables para el formulario de edición
  selectedUser: User | null = null;
  editForm = {
    nombre: '',
    correo: '',
    rfc: '',
    regimenFiscal: '',
    codigoPostal: ''
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  private getInitials(name: string, apellidoPaterno: string): string {
    if (!name) return '';
    
    // Combinar nombre y apellido paterno
    const fullName = `${name} ${apellidoPaterno}`.trim();
    
    // Dividir el nombre completo en palabras
    const words = fullName.split(' ').filter(word => word.length > 0);
    
    // Tomar las iniciales de cada palabra (máximo 3 iniciales)
    const initials = words.slice(0, 3).map(word => word.charAt(0).toUpperCase());
    
    return initials.join('');
  }

  loadUsers(): void {
    this.authService.getUsuarios().subscribe(
      (data: any) => {
        this.usersData = data.map((user: any) => {
          return {
            id: user.id_Usuario,
            name: user.nombre,
            email: user.correo || '',
            rfc: user.rfc || '',
            regimenFiscal: user.regimen_Fiscal || '',
            codigoPostal: user.codigo_Postal || '',
            apellidoPaterno: user.apellidoPaterno || '',
            apellidoMaterno: user.apellidoMaterno || '',
            iniciales: this.getInitials(user.nombre, user.apellidoPaterno || ''),
            contraseña: user.contraseña || ''
          };
        });
        this.allusersData = [...this.usersData];
        this.totalEntries = this.allusersData.length;
        this.updateDisplayedData();
      },
      (error) => {
        this.toastr.error('Error al cargar los usuarios', 'Error');
      }
    );
  }

  onRowsChange(event: any): void {
    this.rowsToShow = +event.target.value;
    this.updateDisplayedData();
  }

  updateDisplayedData() {
    this.usersData = this.allusersData.slice(0, this.rowsToShow);
    this.filteredEntries = this.usersData.length;
  }

  searchName(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.usersData = this.allusersData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm) ||
      item.rfc.toLowerCase().includes(searchTerm)
    );
    this.filteredEntries = this.usersData.length;
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  editUser(user: User): void {
    this.selectedUser = user;
    this.editForm = {
      nombre: user.name,
      correo: user.email,
      rfc: user.rfc,
      regimenFiscal: user.regimenFiscal,
      codigoPostal: user.codigoPostal
    };
    this.open(this.editModal);
  }

  saveEdit(): void {
    if (!this.selectedUser) return;

    const updatedUser = {
      nombre: this.editForm.nombre,
      correo: this.editForm.correo,
      rfc: this.editForm.rfc,
      regimen_Fiscal: this.editForm.regimenFiscal,
      codigo_Postal: this.editForm.codigoPostal,
      contraseña: this.selectedUser.contraseña
    };

    this.authService.updateUsuario(this.selectedUser.id, updatedUser).subscribe(
      () => {
        this.toastr.success('Usuario actualizado exitosamente', 'Éxito');
        this.loadUsers();
        this.modalService.dismissAll();
      },
      (error) => {
        this.toastr.error('Error al actualizar el usuario', 'Error');
      }
    );
  }

  @ViewChild('editModal') editModal!: TemplateRef<any>;

  deleteUser(user: User): void {
    if (confirm(`¿Está seguro que desea eliminar al usuario ${user.name}?`)) {
      this.authService.deleteUsuario(user.id).subscribe(
        () => {
          this.toastr.success('Usuario eliminado exitosamente', 'Éxito');
          this.loadUsers(); // Recargar la lista de usuarios
        },
        (error) => {
          this.toastr.error('Error al eliminar el usuario', 'Error');
        }
      );
    }
  }
}
