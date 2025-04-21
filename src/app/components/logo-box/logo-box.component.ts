import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-logo-box',
  imports: [RouterLink],
  template: `
    <div class="brand">
      <a routerLink="/" class="logo">
        <span class="me-0">
          <img
            src="assets/images/sm-logo.png"
            alt="logo-small"
            class="logo-sm"
          />
        </span>
        <span>
          <img
            src="assets/images/logo.png"
            alt="logo-large"
            class="logo-lg logo-light"
          />
          <img
            src="assets/images/logo.png"
            alt="logo-large"
            class="logo-lg logo-dark"
          />
        </span>
      </a>
    </div>
  `,
  styles: ``,
})
export class LogoBoxComponent {}
