import { credits, currency } from '@/app/common/constants'
import { Component, OnInit, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { AlertsComponent } from '../../ui/alerts/alerts.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-confirm-data',
  imports: [FormsModule, ReactiveFormsModule, NgbAlertModule, CommonModule],
  templateUrl: './confirm-data.component.html',
  styles: ``,
})
export class ConfirmDataComponent {
  secondStepInForm!: UntypedFormGroup
  submitted: boolean = false
  private token: string = ''
  showAlert: boolean = false

  currency = currency
  credits = credits

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)
  public router = inject(Router)

  ngOnInit(): void {
    this.secondStepInForm = this.fb.group({
      nombreCompleto: [
        '',
        [
          Validators.required,
          this.nombreCompletoValidator(), // Validador personalizado
        ],
      ],
      Codigo_Postal: [
        '',
        [
          Validators.required,
          this.codigoPostalValidator(), // Validador personalizado
        ],
      ],
    });
  }

  get form() {
    return this.secondStepInForm.controls;
  }

  facturar() {
    this.submitted = true;
    if (this.secondStepInForm.invalid) {
      this.showAlert = true; // Mostrar alerta si el formulario no es válido
      return;
    }
    // Lógica para facturar
  }

  // Validador personalizado para nombreCompleto
  private nombreCompletoValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // Validar que contenga al menos tres palabras separadas por espacios
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+){2,}$/;
      return regex.test(value) ? null : { invalidNombreCompleto: true };
    };
  }

  // Validador personalizado para Codigo_Postal
  private codigoPostalValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      // Validar que sea un número de 5 dígitos
      const regex = /^\d{5}$/;
      return regex.test(value) ? null : { invalidCodigoPostal: true };
    };
  }
}
