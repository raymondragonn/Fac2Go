import { changetheme } from '@/app/store/layout/layout-action'
import { getLayoutColor } from '@/app/store/layout/layout-selector'
import { Component, EventEmitter, Output, inject, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TabItems } from './data'
import { CommonModule } from '@angular/common'

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

  userType: string = ''; // 'guest', 'user', or 'admin'
  userEmail: string = ''; // Email of the user or admin

  constructor() {
  }

  ngOnInit(): void {
    // Obtener el tipo de usuario y el correo desde localStorage
    this.userType = localStorage.getItem('userType') || 'guest';

    this.userEmail = 'prueba@ejemplo.com';
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
}
