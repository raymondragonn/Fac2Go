import { CommonModule } from '@angular/common'
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  imports: [CommonModule],
  styles: [
    `
      .dynamic-select {
        position: relative;
      }
      .dynamic-select-header {
        cursor: pointer;
      }
      .dynamic-select-options {
        position: absolute;
        background-color: white;
        border: 1px solid #ccc;
      }
      .dynamic-select-option {
        padding: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      .dynamic-select-option:hover {
        background-color: #f1f1f1;
      }
      .dynamic-select-option.selected {
        background-color: #007bff;
        color: white;
      }
      .dynamic-select-header-active {
        background-color: #f1f1f1;
      }
    `,
  ],
})
export class DynamicSelectComponent {
  @Input() placeholder: string = 'Select an option'
  @Input() columns: number = 1
  @Input() width: string = 'auto'
  @Input() height: string = 'auto'
  @Input() data: any[] = []
  @Output() onChange: EventEmitter<any> = new EventEmitter()

  @ViewChild('selectContainer', { static: true }) selectContainer!: ElementRef

  optionsVisible: boolean = false
  selectedValue: string = ''

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible
    const header = this.selectContainer.nativeElement.querySelector(
      '.dynamic-select-header'
    )
    if (this.optionsVisible) {
      header.classList.add('dynamic-select-header-active')
    } else {
      header.classList.remove('dynamic-select-header-active')
    }
  }

  selectOption(option: any) {
    this.selectedValue = option.value
    this.placeholder = option.text
    this.optionsVisible = false
    const header = this.selectContainer.nativeElement.querySelector(
      '.dynamic-select-header'
    )
    header.classList.remove('dynamic-select-header-active') // Hide active class after selection
    this.onChange.emit({ value: option.value, text: option.text })
  }

  getImageStyle(option: any): any {
    return {
      width: option.imgWidth || '20px',
      height: option.imgHeight || '20px',
    }
  }
}
