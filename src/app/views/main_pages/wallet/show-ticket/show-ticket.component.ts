import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturacionService } from '@/app/core/service/facturacion.service';
import { AuthenticationService } from '@/app/core/service/auth.service';

interface ClienteSeleccionado {
  clientId: string;
  rfc: string;
  name: string;
  tipoCliente: string;
}

@Component({
  selector: 'app-show-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxScannerQrcodeComponent],
  templateUrl: './show-ticket.component.html',
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

    .client-info {
      background-color: #f8f9fa;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .client-info h6 {
      color: #6c757d;
      margin-bottom: 0.5rem;
    }

    .client-info p {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
  `]
})
export class ShowTicketComponent implements OnInit {
  @ViewChild('action', { static: false }) scanner!: NgxScannerQrcodeComponent;
  qrValue: string | null = null;
  isLoading: boolean = false;
  clienteSeleccionado: ClienteSeleccionado | null = null;
  currentStep: number = 1;
  selectedMethod: 'qr' | 'manual' | null = null;
  ticketForm!: UntypedFormGroup;
  confirmacionAceptada: boolean = false;
  isProcessingQR: boolean = false;
  usuarioSesion: any;
  usuarioID: any;
  usuario: any;
  nombreUsuario: any;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private facturar: FacturacionService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.initForm();
    // Obtener los parámetros del cliente seleccionado
    this.route.queryParams.subscribe(params => {
      this.clienteSeleccionado = {
        clientId: params['clientId'],
        rfc: params['rfc'],
        name: params['name'],
        tipoCliente: params['tipoCliente']
      };
    });
    console.log(this.clienteSeleccionado);


    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(currentUser)
    this.usuarioSesion = currentUser.usuario;
    console.log(this.usuarioSesion);

    this.authService.getUseridByCorreo(this.usuarioSesion).subscribe((data: any) => {
      if(data){
        
        this.usuarioID = data.id;
        this.nombreUsuario = data.name;
        console.log(this.usuarioID);
        this.authService.getClienteById(this.clienteSeleccionado?.clientId).subscribe((data: any) => {
          console.log(data);
          this.usuario = data;
        })
      }
    })
  }

  initForm() {
    this.ticketForm = this.formBuilder.group({
      token: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }

  selectMethod(method: 'qr' | 'manual') {
    this.selectedMethod = method;
    this.currentStep = 2;
  }

  goBack() {
    if (this.currentStep === 3) {
      this.currentStep = 2;
      this.confirmacionAceptada = false;
    } else if (this.currentStep === 2) {
      this.currentStep = 1;
      this.selectedMethod = null;
      this.qrValue = null;
      this.ticketForm.reset();
      this.isProcessingQR = false;
    } else {
      this.router.navigate(['/wallet']);
    }
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.currentStep = 3; // Avanzar al paso de confirmación
    }
  }

  procesarTicket() {
    if (this.ticketForm.valid && this.clienteSeleccionado && this.confirmacionAceptada) {
      this.generarFactura();
    }
  }

  generateSerie(): string {
  const num = Math.floor(Math.random() * 999) + 1;
  return `A${num.toString().padStart(3, '0')}`;
}

generateFolio(): string {
  const num = Math.floor(Math.random() * 9999) + 1;
  return `FAC-${num.toString().padStart(4, '0')}`;
}

generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

  generarFactura() {
    let formData: any = {
      email: 'eduardoavilat2002@gmail.com',//this.usuarioSesion
      rfc: this.clienteSeleccionado?.rfc,
      servicio: '1',
      token: this.ticketForm.get('token')?.value,
      fechaHora: this.ticketForm.get('fecha')?.value,
      nombreCompleto: this.clienteSeleccionado?.name,
      regimenFiscal: '601',
      Codigo_Postal: this.usuario?.codigo_Postal,
      usoCfdi: this.usuario?.usoCfdi || 'G01',
      
    };

    console.log(formData);
    let now = new Date();
    let fechaTimbrado = now.toISOString().slice(0, 19);

    
    let FacturacionInterna: any = {
      num_Serie: this.generateSerie(),
      folio: this.generateFolio(),
      uuid: this.generateUUID(),
      fecha_Emision: this.ticketForm.get('fecha')?.value,
      fecha_Timbrado: fechaTimbrado,
      id_Cliente: this.clienteSeleccionado?.clientId,
      id_Usuario: this.usuarioID,
      total: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000
    };


    console.log("Iniciando proceso de facturación");
    this.isLoading = true;
    
    console.log(FacturacionInterna)
    this.facturar.facturarCDFI(formData).subscribe(data => {
      if(data){
        let uuid = data;
        console.log(uuid);
        this.facturar.genPDF(formData).subscribe(data => {
          if(data){
            console.log(data);
            this.facturar.genPDFUUID(uuid).subscribe(data => {
              this.isLoading = false;
              alert(`Correo enviado en breve llegara tu factura a tu correo`);
              this.facturar.SendEmail().subscribe(data => {
                this.authService.saveFacturaDatabase(FacturacionInterna).subscribe((data: any)=> {
                  if(data){
                    let auditoria = {
                      accion: 'Facturacion de Ticket',
                      id_Usuario: FacturacionInterna.id_usuario,
                      usuarioName: this.nombreUsuario,
                      id_Cliente: FacturacionInterna.id_Cliente,
                      clienteName: this.clienteSeleccionado?.name
                    }
                    this.authService.setAuditoria(auditoria).subscribe((data: any) => {
                      // setTimeout(() => {
                      // window.location.reload();
                      // }, 3000);
                    })
                  }
                })
              })
            })
          }
        })
      }
    });
  }

  extractValue(data: BehaviorSubject<ScannerQRCodeResult[]>): void {
    if (this.isProcessingQR) return;

    data.subscribe((results) => {
      const qrResult = results.find((result) => result.value);
      this.qrValue = qrResult ? qrResult.value : null;

      if (this.qrValue && this.clienteSeleccionado) {
        this.isProcessingQR = true;
        this.scanner.stop();

        const tokenMatch = this.qrValue.match(/token=([^&]+)/);
        const fechaMatch = this.qrValue.match(/fecha=([^&]+)/);
        const tipoMatch = this.qrValue.match(/tipo=([^&]+)/);
        
        if (tokenMatch && fechaMatch && tipoMatch) {
          const token = tokenMatch[1];
          const fecha = fechaMatch[1];
          const tipo = tipoMatch[1];

          const fechaObj = new Date(fecha);
          const fechaFormateada = fechaObj.toISOString().slice(0, 16);

          console.log('Fecha original:', fecha);
          console.log('Fecha formateada:', fechaFormateada);

          this.ticketForm.patchValue({
            token: token,
            fecha: fechaFormateada,
            tipo: tipo
          });

          this.selectedMethod = 'manual';
          this.isProcessingQR = false;
        } else {
          console.log('Formato de QR no válido');
          this.isProcessingQR = false;
        }
      }
    });
  }
}
