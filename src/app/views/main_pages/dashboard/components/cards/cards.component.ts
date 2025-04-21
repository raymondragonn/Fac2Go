import { DynamicSelectComponent } from '@/app/components/dynamic-select/dynamic-select.component'
import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styles: ``,
})
export class CardsComponent {
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
}
