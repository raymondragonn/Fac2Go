import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UserService } from '@/app/services/user.service';
import { ScannerQRService } from '@/app/services/scanner-qr.service';
import { NgxScannerQrcodeComponent, LOAD_WASM, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbAlertModule, CommonModule, NgbNavModule, NgxScannerQrcodeComponent],
  templateUrl: './principal.component.html',
  styles: ``,
})
export class PrincipalComponent implements OnInit {
  @ViewChild('action', { static: false }) scanner!: NgxScannerQrcodeComponent;
  facturacionForm!: UntypedFormGroup;
  submitted: boolean = false;
  currentStep: number = 1; // Paso inicial
  useQR: boolean = false; // Determina si se seleccionó QR
  confirmacionAceptada: boolean = false;
  showAlert: boolean = false;

  qrValue: string | null = null;

  @ViewChild('videoElement') videoElement!: ElementRef;

  // Opciones para los select
  servicios = [
    { value: '1', label: 'Facturación de boletos' },
    { value: '2', label: 'Facturación de paquetería' },
    { value: '3', label: 'Facturación de consumo de alimentos' },
    { value: '4', label: 'Facturación de hospedaje' },
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
    { value: '626', label: 'Régimen Simplificado de Confianza (RESICO - Personas Físicas)' },
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
    { value: 'CN01', label: 'Nómina' },
  ];

  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);

  constructor(private userService: UserService, private qrService: ScannerQRService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.userService.setUserType('guest');
  }

  extractValue(data: BehaviorSubject<ScannerQRCodeResult[]>): void {
    data.subscribe((results) => {
      const qrResult = results.find((result) => result.value);
      this.qrValue = qrResult ? qrResult.value : null;

      if (this.qrValue) {
        this.qrService.getDataSat(this.qrValue).subscribe(
          (res: any) => {
            this.facturacionForm.patchValue({
              nombreCompleto: `${res['Nombre']} ${res['Apellido Paterno']} ${res['Apellido Materno']}`,
              Codigo_Postal: res['CP'],
              email: res['Correo electrónico'],
              regimenFiscal: res['Regimenes']?.[0]?.['Régimen Fiscal'],
            });
            this.currentStep = 3; // Avanzar al paso 3 automáticamente
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  }

  initializeForm(): void {
    this.facturacionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rfc: ['', [Validators.required, Validators.pattern('^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$')]],
      servicio: ['', [Validators.required]],
      token: ['', [Validators.required, Validators.pattern('^[A-Z0-9-]{14}$')]],
      fechaHora: ['', [Validators.required, past30DaysValidator]],
      nombreCompleto: ['', [Validators.required, this.nombreCompletoValidator()]],
      regimenFiscal: ['', [Validators.required]],
      Codigo_Postal: ['', [Validators.required, this.codigoPostalValidator()]],
      usoCfdi: ['', [Validators.required]],
    });
  }

  selectQR(): void {
    this.useQR = true;
    this.currentStep = 2; // Ir al paso de lectura de QR
  }

  scanQR(): void {
    const video = this.videoElement.nativeElement;
    // Implementar lógica de escaneo de QR
    // Simulación: llenar el formulario con datos del QR
    this.populateFormWithQRData();
    this.currentStep = 3; // Avanzar al siguiente paso
  }

  populateFormWithQRData(): void {
    this.facturacionForm.patchValue({
      email: 'example@example.com',
      rfc: 'RFC123456789',
      servicio: '1',
      token: 'AB12-34CD-5678',
      fechaHora: new Date().toISOString().slice(0, 16),
    });
  }

  nextStep(): void {
    if (this.currentStep === 1 && this.useQR) {
    } else if (this.currentStep === 1 && !this.useQR) {
      this.currentStep = 3; // Saltar al paso 3
    } else if (this.currentStep === 2 && this.useQR) {
      this.currentStep = 4; // Continuar al paso 3 después de QR
    } else {
      this.currentStep++;
    }
  }

  prevStep(): void {
    this.currentStep--;
    this.submitted = false;
    this.showAlert = false;
  }

  scannerQR() {
    this.useQR = true; // Activar el uso de QR
    this.currentStep = 2; // Cambiar al paso 2
  }

  private getControlsForCurrentStep(): AbstractControl[] {
    switch (this.currentStep) {
      case 1:
        return [
          this.facturacionForm.get('email')!,
          this.facturacionForm.get('rfc')!,
          this.facturacionForm.get('servicio')!,
          this.facturacionForm.get('token')!,
          this.facturacionForm.get('fechaHora')!,
        ];
      case 2:
        return [
          this.facturacionForm.get('nombreCompleto')!,
          this.facturacionForm.get('regimenFiscal')!,
          this.facturacionForm.get('Codigo_Postal')!,
          this.facturacionForm.get('usoCfdi')!,
        ];
      default:
        return [];
    }
  }

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
}

// Función de validación para fechas
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

