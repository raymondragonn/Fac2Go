import { Component } from '@angular/core'
import {
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-navbar',
  imports: [NgbDropdownModule, NgbCollapseModule, PagetitleComponent],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  isCollapsed = true
  navbarSupportedContent2 = true
  navbarSupportedContent3 = true
  navbarSupportedContent4 = true
  navbarSupportedContent5 = true
  navbarSupportedContent6 = true
}
