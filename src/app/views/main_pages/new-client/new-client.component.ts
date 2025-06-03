import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { BehaviorSubject } from 'rxjs';
import { ScannerQRService } from '@/app/services/scanner-qr.service';
import { ToastrService } from 'ngx-toastr';

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
  showQRScanner: boolean = false;
  qrValue: string | null = null;
  isPersonaMoral: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private qrService: ScannerQRService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      nombreCompleto: ['', [Validators.required]],
      rfc: ['', [Validators.required, Validators.pattern(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/)]],
      codigoPostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      regimenFiscal: ['', [Validators.required]]
    });
  }

  toggleQRScanner() {
    this.showQRScanner = !this.showQRScanner;
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
          this.clientForm.patchValue({ rfc });
          
          // Determinar si es persona moral (RFC de 12 caracteres)
          this.isPersonaMoral = rfc.length === 12;

          // Obtener datos adicionales del SAT
          this.qrService.getDataSat(this.qrValue).subscribe(
            (res: any) => {
              const regimenFiscalCode = res['Regimenes']?.[0]?.['RegimenFiscal']?.['code'];
              
              this.clientForm.patchValue({
                codigoPostal: res['CP'],
                regimenFiscal: regimenFiscalCode
              });

              // Mostrar mensaje de éxito con los datos cargados
              this.toastr.success(
                `Datos fiscales cargados correctamente:
                RFC: ${rfc}
                Código Postal: ${res['CP']}
                Régimen Fiscal: ${regimenFiscalCode}`,
                '¡Éxito!'
              );
              
              // Cerrar el escáner después de cargar los datos
              this.showQRScanner = false;
            },
            (error) => {
              this.toastr.error('Error al obtener datos del SAT', 'Error');
            }
          );
        }
      }
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      // Aquí implementar la lógica para guardar el cliente
      console.log('Formulario válido:', this.clientForm.value);
    }
  }
}
