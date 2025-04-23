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
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { UserService } from '@/app/services/user.service'

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbAlertModule, CommonModule, NgbNavModule],
  templateUrl: './principal.component.html',
  styles: ``,
})
export class PrincipalComponent implements OnInit {
  facturacionForm!: UntypedFormGroup;
  submitted: boolean = false;
  active: number = 1; // Para controlar el paso activo
  confirmacionAceptada: boolean = false;
  showAlert: boolean = false;
  currentStep: number = 1; 

  // Opciones para los select
  servicios = [
    { value: '1', label: 'Facturación de boletos' },
    { value: '2', label: 'Facturación de paquetería' },
    { value: '3', label: 'Facturación de consumo de alimentos' },
    { value: '4', label: 'Facturación de hospedaje' }
  ];

  regimenesFiscales = [
    { value: '605', label: 'Sueldos y salarios e ingresos asimilados a salarios' },
    { value: '606', label: 'Arrendamiento' },
    { value: '608', label: 'Demás ingresos' },
    { value: '610', label: 'Residentes en el extranjero sin establecimiento permanente en México' },
    { value: '611', label: 'Ingresos por Dividendos (socios y accionistas)' },
    { value: '612', label: 'Personas físicas con actividades empresariales y profesionales' },
    { value: '614', label: 'Ingresos por intereses' },
    { value: '615', label: 'Régimen de los ingresos por obtención de premios' },
    { value: '616', label: 'Sin obligaciones fiscales' },
    { value: '621', label: 'Régimen de Incorporación Fiscal (RIF)' },
    { value: '625', label: 'Régimen de Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras' },
    { value: '626', label: 'Régimen Simplificado de Confianza (RESICO - Personas Físicas)' }
  ];

  usosCFDI = [
    { value: 'G01', label: 'Adquisición de mercancías' },
    { value: 'G02', label: 'Devoluciones, descuentos o bonificaciones' },
    { value: 'G03', label: 'Gastos en general' },
    { value: 'I01', label: 'Construcciones' },
    { value: 'I02', label: 'Mobiliario y equipo de oficina para inversiones' },
    { value: 'I03', label: 'Equipo de transporte' },
    { value: 'I04', label: 'Equipo de cómputo y accesorios' },
    { value: 'I05', label: 'Dados, troqueles, moldes, matrices y herramental' },
    { value: 'I06', label: 'Comunicaciones telefónicas' },
    { value: 'I07', label: 'Comunicaciones satelitales' },
    { value: 'I08', label: 'Otra maquinaria y equipo' },
    { value: 'D01', label: 'Honorarios médicos, dentales y hospitalarios' },
    { value: 'D02', label: 'Gastos médicos por incapacidad o discapacidad' },
    { value: 'D03', label: 'Gastos funerales' },
    { value: 'D04', label: 'Donativos' },
    { value: 'D05', label: 'Intereses reales por créditos hipotecarios' },
    { value: 'D06', label: 'Aportaciones voluntarias al SAR' },
    { value: 'D07', label: 'Primas de seguros de gastos médicos' },
    { value: 'D08', label: 'Gastos de transportación escolar obligatoria' },
    { value: 'D09', label: 'Depósitos en cuentas de ahorro o planes de pensión' },
    { value: 'D10', label: 'Pagos por servicios educativos (colegiaturas)' },
    { value: 'S01', label: 'Sin efectos fiscales' },
    { value: 'CP01', label: 'Pagos' },
    { value: 'CN01', label: 'Nómina' }
  ];

  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);

  constructor(private userService: UserService) {

  }
  
  ngOnInit(): void {
    this.initializeForm();
    this.userService.setUserType('guest');
  }

  initializeForm(): void {
    this.facturacionForm = this.fb.group({
      // Paso 1
      email: ['', [Validators.required, Validators.email]],
      rfc: ['', [Validators.required, Validators.pattern('^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$')]],
      servicio: ['', [Validators.required]],
      token: ['', [Validators.required, Validators.pattern('^[A-Z0-9-]{14}$')]],
      fechaHora: ['', [Validators.required, past30DaysValidator]],
      
      // Paso 2
      nombreCompleto: ['', [Validators.required, this.nombreCompletoValidator()]],
      regimenFiscal: ['', [Validators.required]],
      Codigo_Postal: ['', [Validators.required, this.codigoPostalValidator()]],
      usoCfdi: ['', [Validators.required]],
      
    });
  }

  // Helper methods para obtener nombres de opciones seleccionadas
  getServiceName(value: string): string {
    const servicio = this.servicios.find(s => s.value === value);
    return servicio ? servicio.label : '';
  }

  getRegimenName(value: string): string {
    const regimen = this.regimenesFiscales.find(r => r.value === value);
    return regimen ? regimen.label : '';
  }

  getUsoCfdiName(value: string): string {
    const uso = this.usosCFDI.find(u => u.value === value);
    return uso ? uso.label : '';
  }

  // Validadores personalizados
  private nombreCompletoValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+){2,}$/;
      return regex.test(value) ? null : { invalidNombreCompleto: true };
    };
  }

  private codigoPostalValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const regex = /^\d{5}$/;
      return regex.test(value) ? null : { invalidCodigoPostal: true };
    };
  }

  // Función para enviar el formulario completo
  submitForm(): void {
    this.submitted = true;
    
    if (this.facturacionForm.invalid || !this.confirmacionAceptada) {
      this.showAlert = true;
      return;
    }

    // Aquí iría la lógica para enviar los datos al backend
    const formData = this.facturacionForm.value;
    console.log('Datos a enviar:', formData);
    
    // Ejemplo de redirección después de enviar
    this.router.navigate(['/confirmacion-factura']);
  }

  // Función para validar y avanzar al siguiente paso
  nextStep(): void {
    this.submitted = true;

    // Marcar todos los controles del paso actual como tocados para mostrar errores
    const controlsToValidate = this.getControlsForCurrentStep();
    controlsToValidate.forEach(control => control.markAsTouched());

    // Validar los campos del paso actual
    if (controlsToValidate.some(control => control.invalid)) {
      this.showAlert = true;
      return;
    }

    this.showAlert = false;
    this.currentStep++;
  }

  // Obtener los controles del paso actual
  private getControlsForCurrentStep(): AbstractControl[] {
    switch (this.currentStep) {
      case 1:
        return [
          this.facturacionForm.get('email')!,
          this.facturacionForm.get('rfc')!,
          this.facturacionForm.get('servicio')!,
          this.facturacionForm.get('token')!,
          this.facturacionForm.get('fechaHora')!
        ];
      case 2:
        return [
          this.facturacionForm.get('nombreCompleto')!,
          this.facturacionForm.get('regimenFiscal')!,
          this.facturacionForm.get('Codigo_Postal')!,
          this.facturacionForm.get('usoCfdi')!
        ];
      default:
        return [];
    }
  }

  // Función para retroceder al paso anterior
  prevStep(): void {
    this.active--;
    this.submitted = false;
    this.showAlert = false;
  }
}

// Funciones de validación (deben estar fuera de la clase)
function past30DaysValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  if (selectedDate > currentDate) {
    return { futureDate: true };
  }

  const past30DaysDate = new Date();
  past30DaysDate.setDate(currentDate.getDate() - 30);

  if (selectedDate < past30DaysDate) {
    return { pastLimit: true };
  }

  return null;
}