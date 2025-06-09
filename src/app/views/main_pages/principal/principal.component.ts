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
import { AuthenticationService } from '@/app/core/service/auth.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgbAlertModule, CommonModule, NgbNavModule, NgxScannerQrcodeComponent],
  templateUrl: './principal.component.html',
  styles: [`
    .hover-card {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      border: 2px solid transparent;
      position: relative;
      overflow: hidden;
    }
    
    .hover-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
      opacity: 0;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hover-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3) !important;
    }

    .hover-card:hover::before {
      opacity: 1;
    }

    .qr-card, .manual-card {
      position: relative;
      background: linear-gradient(135deg, #2DC1A4, #25a08c);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .qr-card::after, .manual-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.8s ease;
    }

    .qr-card::after {
      background: linear-gradient(135deg, #2DC1A4, #25a08c);
    }

    .manual-card::after {
      background: linear-gradient(135deg, #2DC1A4, #25a08c);
    }

    .qr-card:hover::after, .manual-card:hover::after {
      opacity: 1;
    }

    .card {
      border-radius: 1rem;
      overflow: hidden;
    }

    .card-body {
      border-radius: 1rem;
      position: relative;
      z-index: 1;
    }

    .btn {
      border-radius: 0.5rem;
      padding: 0.5rem 1.5rem;
      font-weight: 500;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-light {
      background-color: rgba(255, 255, 255, 0.9);
      border: none;
      color: #212529;
    }

    .btn-light:hover {
      background-color: #ffffff;
      transform: scale(1.05);
      color: #212529;
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
    }

    .text-white-50 {
      opacity: 0.8;
    }

    .card-title {
      font-weight: 600;
    }

    .fa-3x {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .qr-card:hover .fa-3x {
      transform: scale(1.1);
      color: #2DC1A4;
    }

    .manual-card:hover .fa-3x {
      transform: scale(1.1);
      color: #2DC1A4;
    }

    .card-body {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-title, .card-text {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `],
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
  isProcessingQR: boolean = false; // Nueva bandera para controlar el procesamiento

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

  constructor(private userService: UserService, private qrService: ScannerQRService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.userService.setUserType('guest');
    // this.authService.getidUser().subscribe((data: any) => {

    // })
  }

  extractValue(data: BehaviorSubject<ScannerQRCodeResult[]>): void {
    if (this.isProcessingQR) return; // Si ya está procesando, no hacer nada

    data.subscribe((results) => {
      const qrResult = results.find((result) => result.value);
      this.qrValue = qrResult ? qrResult.value : null;

      if (this.qrValue) {
        this.isProcessingQR = true; // Marcar que estamos procesando
        this.scanner.stop(); // Detener el escáner

        // Verificar si el QR contiene un RFC (último guion bajo "_")
        const rfcMatch = this.qrValue.match(/_(\w+)$/);
        const rfc = rfcMatch ? rfcMatch[1] : null;

        if (rfc && !this.firstQRProcessed) {
          console.log('QR de Constancia Fiscal detectado');
          console.log('RFC extraído:', rfc);
          this.facturacionForm.patchValue({ rfc });
          this.firstQRProcessed = true;

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
                nombreCompleto = res['Denominación o Razón Social'] || 'Razón Social no disponible';
              } else {
                nombreCompleto = `${res['Nombre']} ${res['Apellido Paterno']} ${res['Apellido Materno']}`;
              }

              this.facturacionForm.patchValue({
                nombreCompleto,
                Codigo_Postal: res['CP'],
                email: res['Correo electrónico'],
                regimenFiscal: regimenFiscalCode,
                usoCfdi: 'G03'
              });

              console.log('Datos fiscales obtenidos correctamente');
              console.log('Por favor, escanee ahora el QR del ticket de compra');
              this.isProcessingQR = false; // Resetear la bandera
            },
            (error) => {
              console.error('Error al obtener datos del SAT:', error);
              this.isProcessingQR = false; // Resetear la bandera en caso de error
            }
          );
        }

        // Verificar si el QR contiene datos del ticket de compra
        const tokenMatch = this.qrValue.match(/token=([^&]+)/);
        const fechaMatch = this.qrValue.match(/fecha=([^&]+)/);
        const tipoMatch = this.qrValue.match(/tipo=([^&]+)/);
        const token = tokenMatch ? tokenMatch[1] : null;
        const fecha = fechaMatch ? fechaMatch[1] : null;
        const tipo = tipoMatch ? tipoMatch[1] : null;

        if (token && fecha && !this.secondQRProcessed) {
          console.log('QR de Ticket de Compra detectado');
          console.log('Token extraído:', token);
          console.log('Fecha extraída:', fecha);
          console.log('Tipo extraído:', tipo);

          const servicioSeleccionado = this.servicios.find(servicio => servicio.value === tipo);
          const servicioLabel = servicioSeleccionado ? servicioSeleccionado.label : 'Tipo no válido';

          this.facturacionForm.patchValue({
            token,
            fechaHora: fecha,
            servicio: tipo
          });

          this.secondQRProcessed = true;
          this.isProcessingQR = false; // Resetear la bandera
        }

        // Avanzar al siguiente paso cuando ambos QR han sido procesados
        if (this.firstQRProcessed && this.secondQRProcessed) {
          console.log('Ambos QR procesados correctamente');
          this.currentStep = 3;
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
    this.currentStep = 2;
    // Resetear el estado del QR
    this.firstQRProcessed = false;
    this.secondQRProcessed = false;
    this.qrValue = null;
  }

  selectManual(): void {
    this.useQR = false;
    this.currentStep = 3;
    // Resetear el estado del QR
    this.firstQRProcessed = false;
    this.secondQRProcessed = false;
    this.qrValue = null;
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
    if (this.currentStep === 1) {
      if (this.useQR) {
        this.currentStep = 2;
      } else {
        this.currentStep = 3;
      }
    } else {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep === 2) {
      this.currentStep = 1;
      this.useQR = false;
      this.resetQRState();
    } else if (this.currentStep === 3) {
      if (this.useQR) {
        this.currentStep = 2;
        this.resetQRState();
      } else {
        this.currentStep = 1;
      }
    } else {
      this.currentStep--;
    }
    this.submitted = false;
    this.showAlert = false;
  }

  // Nuevo método para reiniciar el estado de los QR
  private resetQRState(): void {
    this.firstQRProcessed = false;
    this.secondQRProcessed = false;
    this.qrValue = null;
    this.isProcessingQR = false; // Resetear la bandera
    // Reiniciar los campos del formulario relacionados con los QR
    this.facturacionForm.patchValue({
      rfc: '',
      nombreCompleto: '',
      Codigo_Postal: '',
      email: '',
      regimenFiscal: '',
      token: '',
      fechaHora: '',
      servicio: ''
    });
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

  generateUUID(): string {
  // UUID v4 generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  generateSerie(): string {
  // Genera un número entre 1 y 999, con ceros a la izquierda
    const num = Math.floor(Math.random() * 999) + 1;
    return `A${num.toString().padStart(3, '0')}`;
  }
  

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
    //   email: "eduardoavilat2002@gmail.com",
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
    let now = new Date();
    let fechaFormateada = now.toISOString().slice(0, 19);
    let uuidGenerado = this.generateUUID();

    console.log("Función facturaPrueba ejecutada");
    this.isLoading = true;
    
    this.facturar.facturarCDFI(formData).subscribe((data: any) => {
      if(data){
        let uuid = data.uuid;
        console.log(uuid);
        this.facturar.genPDF(formData).subscribe(data => {
          if(data){
            console.log(data);
            this.facturar.genPDFUUID(uuid).subscribe(data => {
              this.isLoading = false;
              alert(`Correo enviado en breve llegara tu factura a tu correo`);

              this.facturar.SendEmail().subscribe(data => {
                let factura = {
                  num_Serie: this.generateSerie(),
                  folio: formData.token,
                  uuid: uuidGenerado,
                  fecha_Emision: fechaFormateada,
                  fecha_Timbrado: fechaFormateada,
                  id_Cliente: "b73f9c26-1231-4c0e-9d4a-e3fcb7a82db4",
                  id_Usuario: "cb66cccb-62b8-4918-a307-8db0bb7bceb7",
                  total: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000 // total aleatorio entre 1000 y 5000
                }
                this.authService.saveFacturaDatabase(factura).subscribe(data => {
                  window.location.reload();
                })
                
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
