import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { SweetAlertService } from '@/app/core/service/sweet-alert.service'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-sweetalerts',
  imports: [PagetitleComponent],
  templateUrl: './sweetalerts.component.html',
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SweetalertsComponent {
  constructor(private sweetAlertService: SweetAlertService) {}

  showAlert(sub: string) {
    this.sweetAlertService.executeExample(sub)
  }
}
