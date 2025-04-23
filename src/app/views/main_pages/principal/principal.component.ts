import { Component } from '@angular/core';
import { credits, currency } from '@/app/common/constants'

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: ``,
})
export class PrincipalComponent {
    currency = currency
    credits = credits

    ngOnInit(): void {
      localStorage.setItem('userType', 'guest');
    }
    
}
