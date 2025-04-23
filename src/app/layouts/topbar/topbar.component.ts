import { changetheme } from '@/app/store/layout/layout-action'
import { getLayoutColor } from '@/app/store/layout/layout-selector'
import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TabItems } from './data'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'; // Importa el Router
import { UserService } from '@/app/services/user.service'; // Importa el servicio

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
  `,
})
export class TopbarComponent implements OnInit {
  tabItems = TabItems
  store = inject(Store)
  scrollY = 0
  
  @Output() mobileMenuButtonClicked = new EventEmitter()

  userType: string = '';
  userEmail: string = 'prueba@ejemplo.com';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Suscribirse al estado del userType
    this.userService.userType$.subscribe((type) => {
      this.userType = type;
    });
  }

  toggleMobileMenu() {
    this.mobileMenuButtonClicked.emit()
  }

  getDisplayName(): string {
    if (this.userType === 'guest') {
      return 'Invitado';
    } else if (this.userType === 'user' || this.userType === 'admin') {
      return this.userEmail;
    }
    return 'Usuario';
  }

  logout() {
    // Cambiar el tipo de usuario a "guest"
    this.userService.setUserType('guest');

    // Limpiar datos relevantes del localStorage
    localStorage.removeItem('userEmail');

    // Recargar el componente navegando a la misma ruta
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
