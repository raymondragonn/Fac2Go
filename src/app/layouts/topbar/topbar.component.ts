import { changetheme } from '@/app/store/layout/layout-action'
import { getLayoutColor } from '@/app/store/layout/layout-selector'
import { Component, EventEmitter, Output, inject, OnInit, OnDestroy } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TabItems } from './data'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { UserService } from '@/app/services/user.service'
import { Subscription } from 'rxjs'
import { AuthenticationService } from '@/app/core/service/auth.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-topbar',
  imports: [
    NgbDropdownModule,
    SimplebarAngularModule,
    NgbNavModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './topbar.component.html',
  styles: `
    .stop {
      transform: translate3d(4.8px, 74.4px, 0px) !important;
    }

    .nav-icon {
      color: var(--bs-body-color);
      transition: all 0.3s ease;
    }

    .nav-icon:hover {
      color: var(--bs-primary);
    }

    .la-user-shield {
      font-size: 1.25rem;
    }
  `,
})
export class TopbarComponent implements OnInit, OnDestroy {
  tabItems = TabItems
  store = inject(Store)
  scrollY = 0
  
  @Output() mobileMenuButtonClicked = new EventEmitter()

  userType: string = 'guest';
  userName: string = '';
  userEmail: string = '';
  private userTypeSubscription: Subscription = new Subscription();

  constructor(
    private router: Router, 
    private userService: UserService,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Inicializar el tipo de usuario desde el servicio
    this.userType = this.userService.getUserType();
    
    // Suscribirse al estado del userType
    this.userTypeSubscription = this.userService.userType$.subscribe((type) => {
      this.userType = type;
      this.loadUserData();
    });

    // Cargar datos iniciales del usuario
    this.loadUserData();
  }

  private loadUserData(): void {
    if (this.userType === 'admin') {
      this.authService.getCurrentAdmin().subscribe({
        next: (res: any) => {
          this.userName = res.nombre || '';
          this.userEmail = res.correo || '';
        },
        error: (error) => {
          console.error('Error al obtener datos del administrador:', error);
          this.userName = '';
          this.userEmail = '';
        }
      });
    } else if (this.userType === 'user') {
      this.authService.getCurrentUser().subscribe({
        next: (res: any) => {
          this.userName = res.nombre || '';
          this.userEmail = res.correo || '';
        },
        error: (error) => {
          console.error('Error al obtener datos del usuario:', error);
          this.userName = '';
          this.userEmail = '';
        }
      });
    } else {
      this.userName = '';
      this.userEmail = '';
    }
  }

  ngOnDestroy(): void {
    if (this.userTypeSubscription) {
      this.userTypeSubscription.unsubscribe();
    }
  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit()
  }

  getDisplayName(): string {
    if (this.userType === 'guest') {
      return 'Invitado';
    }
    return this.userName || '';
  }

  logout() {
    // Limpiar la sesión en el servicio de autenticación
    this.authService.logout();
    
    // Cambiar el tipo de usuario a "guest"
    this.userService.setUserType('guest');
    this.userName = '';
    this.userEmail = '';

    // Mostrar mensaje de éxito con un estilo más descriptivo
    this.toastr.success(
      'Has cerrado tu sesión correctamente. ¡Gracias por usar Fac2Go!',
      'Sesión finalizada',
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true
      }
    );

    // Redirigir al usuario a la página de inicio
    this.router.navigate(['/']);
  }
}
