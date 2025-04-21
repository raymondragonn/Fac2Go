import { Component } from '@angular/core'
import { SimplebarAngularModule } from 'simplebar-angular'
import { activities, activities2 } from './data'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'

@Component({
  selector: 'app-timeline',
  imports: [SimplebarAngularModule, PagetitleComponent],
  templateUrl: './timeline.component.html',
  styles: ``,
})
export class TimelineComponent {
  activitiesData = activities
  activities2Data = activities2
}
