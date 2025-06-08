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
  userEmail: string = '';
  private userTypeSubscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Inicializar el tipo de usuario desde el servicio
    this.userType = this.userService.getUserType();
    
    // Suscribirse al estado del userType
    this.userTypeSubscription = this.userService.userType$.subscribe((type) => {
      this.userType = type;
    });

    // Obtener el email del usuario actual
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser);
        this.userEmail = userData.usuario || userData.email || '';
      } catch (e) {
        console.error('Error al parsear currentUser:', e);
        this.userEmail = '';
      }
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
    } else if (this.userType === 'user' || this.userType === 'admin') {
      return this.userEmail || 'Usuario';
    }
    return 'Usuario';
  }

  logout() {
    // Cambiar el tipo de usuario a "guest"
    this.userService.setUserType('guest');

    // Limpiar todos los datos relevantes del localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');

    // Recargar el componente navegando a la misma ruta
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
