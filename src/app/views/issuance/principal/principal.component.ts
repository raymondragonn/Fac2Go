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
import { FacturacionService } from '@/app/core/service/facturacion.service';

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
  firstQRProcessed: boolean = false; // Bandera para el primer QR
  secondQRProcessed: boolean = false; // Bandera para el segundo QR
  isPersonaMoral: boolean = false;

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
    { value: '601', label: 'General de Ley Personas Morales' },
    { value: '603', label: 'Personas Morales con Fines no Lucrativos' },
    { value: '605', label: 'Sueldos y Salarios e Ingresos Asimilados a Salarios' },
    { value: '606', label: 'Arrendamiento' },
    { value: '607', label: 'Régimen de Enajenación o Adquisición de Bienes' },
    { value: '608', label: 'Demás ingresos' },
    { value: '610', label: 'Residentes en el Extranjero sin Establecimiento Permanente en México' },
    { value: '611', label: 'Ingresos por Dividendos (socios y accionistas)' },
    { value: '612', label: 'Personas Físicas con Actividades Empresariales y Profesionales' },
    { value: '614', label: 'Ingresos por intereses' },
    { value: '615', label: 'Régimen de los ingresos por obtención de premios' },
    { value: '616', label: 'Sin obligaciones fiscales' },
    { value: '620', label: 'Sociedades Cooperativas de Producción que optan por diferir sus ingresos' },
    { value: '621', label: 'Incorporación Fiscal' },
    { value: '622', label: 'Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras' },
    { value: '623', label: 'Opcional para Grupos de Sociedades' },
    { value: '624', label: 'Coordinados' },
    { value: '625', label: 'Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas' },
    { value: '626', label: 'Régimen Simplificado de Confianza' },
  ];

  usosCFDI = [
    { value: 'G03', label: 'Gastos en general' },
    { value: 'S01', label: 'Sin efectos fiscales' },
  ];

  private fb = inject(UntypedFormBuilder);
  private router = inject(Router);
  private facturar = inject(FacturacionService);
  isLoading: boolean = false;

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
        // Verificar si el QR contiene un RFC (último guion bajo "_")
        const rfcMatch = this.qrValue.match(/_(\w+)$/);
        const rfc = rfcMatch ? rfcMatch[1] : null;

        if (rfc) {
          console.log('RFC extraído:', rfc);
          this.facturacionForm.patchValue({ rfc });
          this.firstQRProcessed = true; // Marcar el primer QR como procesado

          // Determinar si es persona moral (RFC de 12 caracteres)
          this.isPersonaMoral = rfc.length === 12;

          // Obtener datos adicionales del SAT
          this.qrService.getDataSat(this.qrValue).subscribe(
            (res: any) => {
              const regimenFiscalCode = res['Regimenes']?.[0]?.['RegimenFiscal']?.['code'];
              const regimenFiscalLabel = this.regimenesFiscales.find(
                (regimen) => regimen.value === regimenFiscalCode
              )?.label || 'Régimen no válido';

              let nombreCompleto = '';

              if (this.isPersonaMoral) {
                // Si es persona moral, usar "Denominación o Razón Social"
                nombreCompleto = res['Denominación o Razón Social'] || 'Razón Social no disponible';
              } else {
                // Si es persona física, concatenar nombre y apellidos
                nombreCompleto = `${res['Nombre']} ${res['Apellido Paterno']} ${res['Apellido Materno']}`;
              }

              this.facturacionForm.patchValue({
                nombreCompleto,
                Codigo_Postal: res['CP'],
                email: res['Correo electrónico'],
                regimenFiscal: regimenFiscalCode, // Asignar el código al formulario
              });

              console.log('Nombre completo o Razón Social asignado:', nombreCompleto);
              console.log('Régimen fiscal seleccionado:', regimenFiscalLabel);
            },
            (error) => {
              console.error('Error al obtener datos del SAT:', error);
            }
          );
        }

        // Verificar si el QR contiene un enlace con token y fecha
        const tokenMatch = this.qrValue.match(/token=([^&]+)/);
        const fechaMatch = this.qrValue.match(/fecha=([^&]+)/);
        const tipoMatch = this.qrValue.match(/tipo=([^&]+)/);
        const token = tokenMatch ? tokenMatch[1] : null;
        const fecha = fechaMatch ? fechaMatch[1] : null;
        const tipo = tipoMatch ? tipoMatch[1] : null;

        if (token && fecha) {
          console.log('Token extraído:', token);
          console.log('Fecha extraída:', fecha);
          console.log('Tipo extraído:', tipo);

          // Buscar el label correspondiente al tipo en el arreglo servicios
          const servicioSeleccionado = this.servicios.find(servicio => servicio.value === tipo);
          const servicioLabel = servicioSeleccionado ? servicioSeleccionado.label : 'Tipo no válido';

          console.log('Servicio seleccionado:', servicioLabel);

          this.facturacionForm.patchValue({
            token,
            fechaHora: fecha,
            servicio: tipo // Asignar el value al formulario
          });

          this.secondQRProcessed = true; // Marcar el segundo QR como procesado
        }

        // Solo avanzar al siguiente paso si ambos QR han sido procesados
        if (this.firstQRProcessed && this.secondQRProcessed) {
          console.log('Ambos QR procesados. Avanzando al siguiente paso.');
          this.currentStep = 3; // Avanzar al paso 3 automáticamente
        } else {
          console.log('Esperando a que ambos QR sean procesados.');
        }
      }
    });
  }

  initializeForm(): void {
    this.facturacionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rfc: ['', [Validators.required, Validators.pattern('^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$')]],
      servicio: ['', [Validators.required]],
      token: ['', [Validators.required, Validators.pattern('^TOKEN_\\d{6}$')]],
      fechaHora: ['', [Validators.required, past30DaysValidator]],
      nombreCompleto: ['', [Validators.required, this.dynamicNombreValidator()]], // Validador dinámico
      regimenFiscal: ['', [Validators.required]],
      Codigo_Postal: ['', [Validators.required, this.codigoPostalValidator()]],
      usoCfdi: ['G03', [Validators.required]], // Valor predeterminado
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
      token: 'TOKEN_753628',
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
  
  private form: any = {
    email: 'eduardoavilat2002@gmail.com',
    rfc: 'AMI780504F88', 
    servicio: '1', 
    token: 'TOKEN_123456', 
    fechaHora: "10/09/2024", 
    nombreCompleto: 'AISLANTES MINERALES', 
    regimenFiscal: '601', 
    Codigo_Postal: '78395', 
    usoCfdi: 'G03', 
  };
  

  generarFactura() {
    let formData: any = {
      email: this.facturacionForm.get('email')?.value,
      rfc: this.facturacionForm.get('rfc')?.value, 
      servicio: '1', 
      token: this.facturacionForm.get('token')?.value, 
      fechaHora: "10/09/2024", 
      nombreCompleto: this.facturacionForm.get('nombreCompleto')?.value, 
      regimenFiscal: this.facturacionForm.get('regimenFiscal')?.value, 
      Codigo_Postal: this.facturacionForm.get('Codigo_Postal')?.value, 
      usoCfdi: this.facturacionForm.get('usoCfdi')?.value
    }
    
    // let formData: any = {
    //   email: this.facturacionForm.get('email')?.value,
    //   rfc: 'AMI780504F88', 
    //   servicio: '1', 
    //   token: 'TOKEN_123456', 
    //   fechaHora: "10/09/2024", 
    //   nombreCompleto: 'AISLANTES MINERALES', 
    //   regimenFiscal: '601', 
    //   Codigo_Postal: '78395', 
    //   usoCfdi: 'G03', 
    // };
    console.log(this.form);
    console.log(formData);

    console.log("Función facturaPrueba ejecutada");
    this.isLoading = true;
    
    this.facturar.facturarCDFI(formData).subscribe(data => {
      if(data){
        let uuid = data;
        console.log(uuid);
        this.facturar.genPDF(formData).subscribe(data => {
          if(data){
            console.log(data);
            this.isLoading = false;
            this.facturar.genPDFUUID(uuid).subscribe(data => {
              this.facturar.SendEmail().subscribe(data => {
              
              })
            })
          }
          
        })
      }
      
    });
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

  // Validador dinámico para "Nombre Completo" o "Razón Social"
  private dynamicNombreValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (this.isPersonaMoral) {
        // Validación para "Razón Social"
        const razonSocialRegex = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,&]+$/;
        return razonSocialRegex.test(value) ? null : { invalidRazonSocial: true };
      } else {
        // Validación para "Nombre Completo"
        const nombreCompletoRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+){2,}$/;
        return nombreCompletoRegex.test(value) ? null : { invalidNombreCompleto: true };
      }
    };
  }

  // Validador para Código Postal
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
  past30DaysDate.setDate(currentDate.getDate() - 90);

  if (selectedDate < past30DaysDate) {
    return { pastLimit: true };
  }

  return null;
}
