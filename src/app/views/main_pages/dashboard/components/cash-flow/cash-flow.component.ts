import { ChartOptions } from '@/app/common/apexchart.model'
import { Component } from '@angular/core'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-cash-flow',
  imports: [NgbDropdownModule, NgApexchartsModule],
  templateUrl: './cash-flow.component.html',
  styles: ``,
})
export class CashFlowComponent {
  cashflowChart: Partial<ChartOptions> = {
    series: [76],
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
      zoom: {
        allowMouseWheelZoom: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '75%',
          position: 'front',
        },
        track: {
          background: ['rgba(42, 118, 244, .18)'],
          strokeWidth: '80%',
          opacity: 0.5,
          margin: 5,
          // lineCap: 'round'
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '20px',
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
    colors: ['var(--bs-primary)'],
    grid: {
      padding: {
        top: -10,
      },
    },

    labels: ['Average Results'],
  }
}
