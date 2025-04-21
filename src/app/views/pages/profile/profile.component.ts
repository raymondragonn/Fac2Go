import { Component } from '@angular/core'
import { PersonalDetailComponent } from './components/personal-detail/personal-detail.component'
import { PersonalInfoComponent } from './components/personal-info/personal-info.component'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-profile',
  imports: [PersonalDetailComponent, PersonalInfoComponent, PagetitleComponent],
  templateUrl: './profile.component.html',
  styles: ``,
})
export class ProfileComponent {}
