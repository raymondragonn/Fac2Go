import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { BehaviorSubject } from 'rxjs';
import { ScannerQRService } from '@/app/services/scanner-qr.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '@/app/core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-client',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxScannerQrcodeComponent],
  templateUrl: './new-client.component.html',
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

    .qr-card {
      position: relative;
      background: linear-gradient(135deg, #2DC1A4, #25a08c);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .qr-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.8s ease;
      background: linear-gradient(135deg, #2DC1A4, #25a08c);
    }

    .qr-card:hover::after {
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
  `]
})
export class NewClientComponent implements OnInit {
  @ViewChild('action', { static: false }) scanner!: NgxScannerQrcodeComponent;
  
  clientForm!: UntypedFormGroup;
  currentStep: number = 1;
  selectedMethod: 'qr' | 'manual' | null = null;
  qrValue: string | null = null;
  isPersonaMoral: boolean = false;
  isProcessingQR: boolean = false;
  usuaarioEnSesion: any;
  idUsuario: any;
  
  constructor(
    private formBuilder: UntypedFormBuilder,
    private qrService: ScannerQRService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(currentUser.usuario);
    this.usuaarioEnSesion = currentUser.usuario;
    this.authService.getUseridByCorreo(this.usuaarioEnSesion).subscribe(
      (response: any) => {
        this.idUsuario = response.id;
        console.log(this.idUsuario);
      }
    )
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      nombreCompleto: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      regimenFiscal: ['', [Validators.required]]
    });
  }

  selectMethod(method: 'qr' | 'manual') {
    this.selectedMethod = method;
    this.currentStep = 2;
  }

  goBack() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
      this.selectedMethod = null;
      this.qrValue = null;
      this.clientForm.reset();
      this.isProcessingQR = false;
    }
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const cliente = {
        nombre_RazonSocial: this.clientForm.value.nombreCompleto,
        rfc: this.clientForm.value.rfc,
        codigo_Postal: this.clientForm.value.codigoPostal,
        regimenFiscal: this.clientForm.value.regimenFiscal,
        id_Usuario: this.idUsuario
      };

      this.authService.newCliente(cliente).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.toastr.success(`${response.message}. Cliente: ${response.cliente.correo || ''}`, 'Éxito');
            this.clientForm.reset();
            this.currentStep = 1;
            this.selectedMethod = null;
            setTimeout(() => {
              this.router.navigate(['/wallet']);
            }, 1500);
          } else {
            this.toastr.error(response.message, 'Error');
          }
        },
        (error) => {
          this.toastr.error('Error al guardar el cliente', 'Error');
        }
      );
    }
  }

  extractValue(data: BehaviorSubject<ScannerQRCodeResult[]>): void {
    if (this.isProcessingQR) return;

    data.subscribe((results) => {
      const qrResult = results.find((result) => result.value);
      this.qrValue = qrResult ? qrResult.value : null;

      if (this.qrValue) {
        this.isProcessingQR = true;
        this.scanner.stop();

        const rfcMatch = this.qrValue.match(/_(\w+)$/);
        const rfc = rfcMatch ? rfcMatch[1] : null;

        if (rfc) {
          console.log('RFC extraído:', rfc);
          
          this.authService.getClientes().subscribe(
            (response: any) => {
              const clientes = Array.isArray(response) ? response : [];
              const clienteExistente = clientes.find(cliente => cliente.rfc === rfc);
              
              if (clienteExistente) {
                this.toastr.error(`El cliente con RFC ${rfc} ya existe en tu cartera`, 'Cliente Duplicado');
                this.goBack();
                this.isProcessingQR = false;
                return;
              }

              this.clientForm.patchValue({ rfc });
              
              this.isPersonaMoral = rfc.length === 12;

              if (this.qrValue) {
                this.qrService.getDataSat(this.qrValue).subscribe(
                  (res: any) => {
                    const regimenFiscalCode = res['Regimenes']?.[0]?.['RegimenFiscal']?.['code'];
                    
                    let nombreCompleto = '';
                    if (this.isPersonaMoral) {
                      nombreCompleto = res['Denominación o Razón Social'] || 'Razón Social no disponible';
                    } else {
                      nombreCompleto = `${res['Nombre']} ${res['Apellido Paterno']} ${res['Apellido Materno']}`;
                    }
                    
                    this.clientForm.patchValue({
                      nombreCompleto,
                      codigoPostal: res['CP'],
                      regimenFiscal: regimenFiscalCode
                    });

                    this.selectedMethod = 'manual';

                    this.toastr.success(
                      `Datos fiscales cargados correctamente:
                      ${this.isPersonaMoral ? 'Razón Social' : 'Nombre Completo'}: ${nombreCompleto}
                      RFC: ${rfc}
                      Código Postal: ${res['CP']}
                      Régimen Fiscal: ${regimenFiscalCode}`,
                      '¡Éxito!'
                    );
                    this.isProcessingQR = false;
                  },
                  (error) => {
                    this.toastr.error('Error al obtener datos del SAT', 'Error');
                    this.isProcessingQR = false;
                  }
                );
              }
            },
            (error) => {
              this.toastr.error('Error al verificar cliente existente', 'Error');
              this.isProcessingQR = false;
            }
          );
        } else {
          this.toastr.error('No se pudo extraer el RFC del código QR', 'Error');
          this.isProcessingQR = false;
        }
      }
    });
  }
}
