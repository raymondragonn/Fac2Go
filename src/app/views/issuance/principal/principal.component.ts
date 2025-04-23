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

// Validador personalizado para verificar que la fecha no sea del pasado
function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  // Comparar solo fechas (sin horas)
  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate < currentDate ? { pastDate: true } : null;
}

// Validador personalizado para verificar que la fecha no sea futura
function pastOrPresentDateValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  // Comparar solo fechas (sin horas)
  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate > currentDate ? { futureDate: true } : null;
}

// Validador personalizado para verificar que la fecha esté dentro de los últimos 30 días
function past30DaysValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  // Comparar solo fechas (sin horas)
  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  // Calcular la fecha límite de 30 días atrás
  const past30DaysDate = new Date();
  past30DaysDate.setDate(currentDate.getDate() - 30);

  if (selectedDate > currentDate) {
    return { futureDate: true }; // La fecha no puede ser futura
  }

  if (selectedDate < past30DaysDate) {
    return { pastLimit: true }; // La fecha no puede ser más antigua que 30 días
  }

  return null; // La fecha es válida
}

@Component({
  selector: 'app-principal',
  imports:[FormsModule, ReactiveFormsModule,NgbAlertModule,CommonModule],
  templateUrl: './principal.component.html',
  styles: ``,
})
export class PrincipalComponent {
  firstStepInForm!: UntypedFormGroup
  submitted: boolean = false
  private token: string = ''
  showAlert: boolean = false

  currency = currency
  credits = credits

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)
  public router = inject(Router)

  ngOnInit(): void {
    localStorage.setItem('userType', 'guest');
    this.firstStepInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rfc: ['', [Validators.required, Validators.pattern('^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$')]], // RFC con formato válido
      servicio: ['', [Validators.required]],
      token: ['', [Validators.required, Validators.pattern('^[A-Z0-9-]{13}$')]], // Token con formato específico
      fechaHora: ['', [Validators.required, past30DaysValidator]], // Validación personalizada para fecha
    });
  }  
  
  get form() {
    return this.firstStepInForm.controls
  }

  nextStep() {
    this.submitted = true;

    // Validar si el formulario es inválido
    if (this.firstStepInForm.invalid) {
      this.showAlert = true; // Mostrar alerta si el formulario no es válido
      return;
    }

    // Preparar los datos para enviar al backend
    const formData = this.firstStepInForm.value;


    // Navegar a la siguiente página si todo es válido
    this.router.navigate(['issuance/confirm-data']);
  }
}
