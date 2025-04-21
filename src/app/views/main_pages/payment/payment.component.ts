import { Component } from '@angular/core'
import { PagetitleComponent } from '../../../components/pagetitle/pagetitle.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartOptions } from '@/app/common/apexchart.model'
import { CommonModule } from '@angular/common'
import { FormNewInvoiceComponent } from "./components/form-new-invoice/form-new-invoice.component";
import { PendingInvoiceComponent } from './components/pending-invoice/pending-invoice.component'
import { IaAdvicesComponent } from './components/ia-advices/ia-advices.component'

@Component({
  selector: 'app-payment',
  imports: [
    PagetitleComponent,
    NgbDropdownModule,
    NgApexchartsModule,
    CommonModule,
    FormNewInvoiceComponent,
    PendingInvoiceComponent,
    IaAdvicesComponent
],
  templateUrl: './payment.component.html',
  styles: ``,
})
export class PaymentComponent {
  paymentData = [
    {
      name: 'William Hirsch',
      country: 'USA',
      avatar: 'assets/images/users/avatar-1.jpg',
      invoice: 'INV-5784',
      link: 'apps-invoice.html',
      service: 'Service Fee',
      date: '20 July 2024',
      time: '03:25pm',
      amount: '$560',
      status: {
        label: 'Paid',
        class: 'badge bg-success-subtle text-success fs-11 fw-medium px-2',
      },
    },
    {
      name: 'Louise Black',
      country: 'Germany',
      avatar: 'assets/images/users/avatar-2.jpg',
      invoice: 'INV-3256',
      link: 'apps-invoice.html',
      service: 'UI/UX Project',
      date: '15 July 2024',
      time: '12:35pm',
      amount: '$700',
      status: {
        label: 'Paid',
        class: 'badge bg-success-subtle text-success fs-11 fw-medium px-2',
      },
    },
    {
      name: 'Robert Douglas',
      country: 'France',
      avatar: 'assets/images/users/avatar-3.jpg',
      invoice: 'INV-9865',
      link: 'apps-invoice.html',
      service: 'Freelancer Fee',
      date: '12 July 2024',
      time: '10:05am',
      amount: '$980',
      status: {
        label: 'Pending',
        class: 'badge bg-warning-subtle text-warning fs-11 fw-medium px-2',
      },
    },
    {
      name: 'Annabelle Reny',
      country: 'Canada',
      avatar: 'assets/images/users/avatar-4.jpg',
      invoice: 'INV-9960',
      link: 'apps-invoice.html',
      service: 'Monthly SIP Plan',
      date: '30 June 2024',
      time: '11:12pm',
      amount: '$250',
      status: {
        label: 'Paid',
        class: 'badge bg-success-subtle text-success fs-11 fw-medium px-2',
      },
    },
    {
      name: 'Russell Regnier',
      country: 'Russia',
      avatar: 'assets/images/users/avatar-5.jpg',
      invoice: 'INV-5847',
      link: 'apps-invoice.html',
      service: 'Hotel Booking',
      date: '19 June 2024',
      time: '07:15pm',
      amount: '$430',
      status: {
        label: 'Cancle',
        class: 'badge bg-danger-subtle text-danger fs-11 fw-medium px-2',
      },
    },
    {
      name: 'John Singer',
      country: 'India',
      avatar: 'assets/images/users/avatar-6.jpg',
      invoice: 'INV-4111',
      link: 'apps-invoice.html',
      service: 'Server Subscription',
      date: '05 June 2024',
      time: '02:40pm',
      amount: '$600',
      status: {
        label: 'Paid',
        class: 'badge bg-success-subtle text-success fs-11 fw-medium px-2',
      },
    },
  ]
  selectedValue: any
  optionsVisible = false
  placeholder: string
  width: string = ''
  height: string = '40px'
  data = [
    { img: 'assets/images/logos/m-card.png', text: 'xx25' },
    { img: 'assets/images/logos/ame-bank.png', text: 'xx21' },
  ]

  constructor() {
    this.selectedValue = this.data[0]
    this.placeholder = this.data[0]?.text || 'Select an option'
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible
  }

  selectOption(option: any) {
    this.selectedValue = option
    this.placeholder = option.text
    this.optionsVisible = false
  }

  getImageStyle(option: any) {
    return { width: '20px', height: '20px' }
  }

  paymentCustomer: Partial<ChartOptions> = {
    chart: {
      height: 285,
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
