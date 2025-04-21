import { ChartOptions } from '@/app/common/apexchart.model'
import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-balance-detail',
  imports: [NgApexchartsModule],
  templateUrl: './balance-detail.component.html',
  styles: ``,
})
export class BalanceDetailComponent {
  balanceChart: Partial<ChartOptions> = {
    chart: {
      height: 250,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '80%',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },

    series: [50, 25, 10, 15],
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      // verticalAlign: 'middle',
      floating: false,
      fontSize: '13px',
      fontFamily: 'Be Vietnam Pro, sans-serif',
      offsetX: 0,
      offsetY: 0,
    },
    labels: ['USD', 'Euro', 'Pounds', 'Dinar'],
    colors: ['#0e2a89', '#d96345', '#ffb600', '#47cdea'],
  }
}
