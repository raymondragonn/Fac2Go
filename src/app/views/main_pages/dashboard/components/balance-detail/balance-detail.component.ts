import { Component } from '@angular/core'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartOptions } from '@/app/common/apexchart.model'

@Component({
  selector: 'app-balance-detail',
  imports: [NgApexchartsModule],
  templateUrl: './balance-detail.component.html',
  styles: ``,
})
export class BalanceDetailComponent {
  BalanceChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Ingresos',
        data: [2.7, 2.2, 1.3, 2.5, 1, 2.5, 1.2, 1.2, 2.7, 1, 3.6, 2.1],
      },
      {
        name: 'Gastos',
        data: [-2.3, -1.9, -1, -2.1, -1.3, -2.2, -1.1, -2.3, -2.8, -1.1, -2.5, -1.5],
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      type: 'bar',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      height: 370,
      stacked: true,
      offsetX: -15,
      zoom: {
        allowMouseWheelZoom: false,
      },
    },
    colors: ['var(--bs-success)', 'rgba(155, 171, 187, .25)'],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '80%',
        columnWidth: '20%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      padding: {
        top: 0,
        bottom: 0,
        right: 0,
      },
      borderColor: 'rgba(0,0,0,0.05)',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      min: -5,
      max: 5,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
    },
  }
}
