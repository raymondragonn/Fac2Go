import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExchangeRateComponent } from './exchange-rate.component'

describe('ExchangeRateComponent', () => {
  let component: ExchangeRateComponent
  let fixture: ComponentFixture<ExchangeRateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeRateComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ExchangeRateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
