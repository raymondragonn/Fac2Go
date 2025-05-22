import { LogoBoxComponent } from '@/app/components/logo-box/logo-box.component'
import { Component, inject } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { SimplebarAngularModule } from 'simplebar-angular'
import { NgbCollapseModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap'
import { findAllParent, findMenuItem } from '@/app/core/helpers/utils'
import { CommonModule } from '@angular/common'
import { MenuItem } from '@/app/core/models/menu.model'
import { MENU_ITEMS_ADMIN } from '@/app/common/menu-item-admin'
import { MENU_ITEMS_USERS } from '@/app/common/menu-item-users'
import { MENU_ITEMS_GUEST } from '@/app/common/menu-item-guest'
import { basePath } from '@/app/common/constants'
import { UserService } from '@/app/services/user.service'; // Importa el servicio

@Component({
  selector: 'app-sidebar',
  imports: [
    SimplebarAngularModule,
    LogoBoxComponent,
    RouterModule,
    NgbCollapseModule,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styles: [`
    .admin-login-link {
      background-color: rgba(0,0,0,0.02);
      transition: all 0.3s ease;
      margin-top: auto;
      border-top: 1px solid rgba(0,0,0,0.1);
    }

    .admin-login-link a {
      color: var(--bs-primary);
      transition: all 0.3s ease;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      font-weight: 500;
    }

    .admin-login-link:hover {
      background-color: rgba(0,0,0,0.05);
    }

    .admin-login-link a:hover {
      color: var(--bs-primary-dark);
    }

    .admin-login-link i {
      font-size: 1.25rem;
      margin-right: 0.75rem;
    }
  `]
})
export class SidebarComponent {
  menuItems = MENU_ITEMS_GUEST
  activeMenuItems: string[] = []
  router = inject(Router)
  isGuest = false;

  trimmedURL = this.router.url?.replaceAll(
    basePath !== '' ? basePath + '/' : '',
    '/'
  )

  constructor(private userService: UserService) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.trimmedURL = this.router.url?.replaceAll(
          basePath !== '' ? basePath + '/' : '',
          '/'
        )
        this._activateMenu()
        setTimeout(() => {
          // this.scrollToActive();
        }, 200)
      }
    })

    // Suscribirse al estado del userType
    this.userService.userType$.subscribe((userType) => {
      this.updateMenu(userType);
      this.isGuest = userType === 'guest';
    });
  }

  ngOnInit() {
    const userType = this.userService.getUserType();
    this.updateMenu(userType);
    this.isGuest = userType === 'guest';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._activateMenu()
    })
  }

  updateMenu(userType: string): void {
    if (userType === 'admin') {
      this.menuItems = MENU_ITEMS_ADMIN;
    } else if (userType === 'guest') {
      this.menuItems = MENU_ITEMS_GUEST;
    } else {
      this.menuItems = MENU_ITEMS_USERS;
    }
  }

  /**
   * toggles open menu
   * @param menuItem clicked menuitem
   * @param collapse collpase instance
   */
  toggleMenuItem(menuItem: MenuItem, collapse: NgbCollapse): void {
    collapse.toggle()
    let openMenuItems: string[]
    if (!menuItem.collapsed) {
      openMenuItems = [
        menuItem['key'],
        ...findAllParent(this.menuItems, menuItem),
      ]
      const collapseMenuItems = (menu: MenuItem) => {
        if (menu.subMenu) {
          menu.subMenu.forEach(collapseMenuItems)
        }
        if (!openMenuItems.includes(menu.key!)) {
          menu.collapsed = true
        }
      }

      this.menuItems.forEach(collapseMenuItems)
    }
  }

  _activateMenu(): void {
    const div = document.querySelector('.navbar-nav')
    let matchingMenuItem = null

    if (div) {
      let items: any = div.getElementsByClassName('nav-link')
      for (let i = 0; i < items.length; ++i) {
        if (this.trimmedURL === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('aria-controls')
        const activeMt = findMenuItem(this.menuItems, mid)

        if (activeMt) {
          const matchingObjs = [
            activeMt['key'],
            ...findAllParent(this.menuItems, activeMt),
          ]

          this.activeMenuItems = matchingObjs

          const collapseMenuItems = (menu: MenuItem) => {
            if (menu.subMenu) {
              menu.subMenu.forEach(collapseMenuItems)
            }
            menu.collapsed = !matchingObjs.includes(menu.key!)
          }

          this.menuItems.forEach(collapseMenuItems)
        }
      }
    }
  }

  hasSubmenu(menu: MenuItem): boolean {
    return menu.subMenu ? true : false
  }
}
