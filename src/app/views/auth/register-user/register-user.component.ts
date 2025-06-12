import { CommonModule } from '@angular/common'
import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core'
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { Store } from '@ngrx/store'
import { ToastrService } from 'ngx-toastr'
import { NgxScannerQrcodeComponent, LOAD_WASM, ScannerQRCodeResult } from 'ngx-scanner-qrcode'
import { BehaviorSubject } from 'rxjs'
import { ScannerQRService } from '@/app/services/scanner-qr.service'
import { AuthenticationService } from '@/app/core/service/auth.service'

@Component({
  selector: 'app-register-user',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule, NgbAlertModule, NgxScannerQrcodeComponent],
  templateUrl: './register-user.component.html',
  styles: ``,
})
export class RegisterUserComponent implements OnInit {
  @ViewChild('action', { static: false }) scanner!: NgxScannerQrcodeComponent;
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  showAlert: boolean = false
  currentStep: number = 1
  showQRScanner: boolean = false
  isPersonaMoral: boolean = false
  qrValue: string | null = null
  showPassword: boolean = false
  showConfirmPassword: boolean = false

  constructor(private authService: AuthenticationService) {

  }

  regimenesFiscales = [
    { value: '601', label: 'General de Ley Personas Morales' },
    { value: '603', label: 'Personas Morales con Fines no Lucrativos' },
    { value: '605', label: 'Sueldos y Salarios e Ingresos Asimilados a Salarios' },
    { value: '606', label: 'Arrendamiento' },
    { value: '608', label: 'Demás ingresos' },
    { value: '611', label: 'Ingresos por Dividendos' },
    { value: '612', label: 'Personas Físicas con Actividades Empresariales y Profesionales' },
    { value: '614', label: 'Ingresos por intereses' },
    { value: '616', label: 'Sin obligaciones fiscales' },
    { value: '620', label: 'Sociedades Cooperativas de Producción' },
    { value: '621', label: 'Incorporación Fiscal' },
    { value: '622', label: 'Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras' },
    { value: '623', label: 'Opcional para Grupos de Sociedades' },
    { value: '624', label: 'Coordinados' },
    { value: '625', label: 'Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas' },
    { value: '626', label: 'Régimen Simplificado de Confianza' },
  ];

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)
  public router = inject(Router)
  public toastr = inject(ToastrService)
  private qrService = inject(ScannerQRService)
  

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      // Paso 1: Datos personales
      name: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-z]+ [A-Za-z]+ [A-Za-z]+$'),
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ]],
      confirmpwd: ['', [Validators.required]],
      // Paso 2: Datos fiscales
      rfc: ['', [Validators.required, Validators.pattern('^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$')]],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      regimenFiscal: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmpwd')
    });

    // Marcar todos los campos como touched cuando se envía el formulario
    this.signupForm.valueChanges.subscribe(() => {
      if (this.submitted) {
        Object.keys(this.signupForm.controls).forEach(key => {
          const control = this.signupForm.get(key);
          if (control) {
            control.markAsTouched();
          }
        });
      }
    });
  }

  registerUser() {
    this.submitted = true;
    
    // Marcar todos los campos como touched
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });

    if (this.signupForm.valid) {
      const userData = {
        nombre: this.signupForm.value.name,
        correo: this.signupForm.value.email,
        contraseña: this.signupForm.value.password,
        rfc: this.signupForm.value.rfc,
        codigo_Postal: this.signupForm.value.codigoPostal,
        regimen_Fiscal: this.signupForm.value.regimenFiscal,
        rol: 'user'
      };

      this.authService.registerUser(userData).subscribe(
        (response: any) => {
          if(response.message === 'Usuario creado exitosamente'){
            this.toastr.success('Usuario registrado exitosamente.', '¡Éxito!');
            setTimeout(() => {
              this.router.navigate(['auth/login-user']);
            }, 2000);
          } else {
            this.toastr.error('Error al registrar el usuario');
          }
        },
        (error) => {
          console.error('Error en el registro:', error);
          this.toastr.error('Error al registrar el usuario');
        }
      );
    } else {
      this.toastr.error('Por favor, completa todos los campos correctamente', 'Error de validación');
    }
  }

  get form() {
    return this.signupForm.controls
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName]
      const matchingControl = formGroup.controls[matchingControlName]
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Este campo es requerido';
    }

    if (controlName === 'name') {
      if (control.hasError('pattern')) {
        return 'El nombre debe contener solo letras y espacios (sin acentos ni caracteres especiales)';
      }
      if (control.hasError('minlength')) {
        return 'El nombre debe tener al menos 5 caracteres';
      }
      if (control.hasError('maxlength')) {
        return 'El nombre no debe exceder los 100 caracteres';
      }
    }

    if (controlName === 'email') {
      if (control.hasError('email')) {
        return 'El formato del correo electrónico no es válido';
      }
      if (control.hasError('pattern')) {
        return 'El correo electrónico debe tener un formato válido (ejemplo: usuario@dominio.com)';
      }
    }

    if (controlName === 'password') {
      if (control.hasError('minlength')) {
        return 'La contraseña debe tener al menos 8 caracteres';
      }
      if (control.hasError('pattern')) {
        return 'La contraseña debe contener al menos una letra y un número';
      }
    }

    if (controlName === 'confirmpwd') {
      if (control.hasError('mustMatch')) {
        return 'Las contraseñas no coinciden';
      }
    }

    if (controlName === 'rfc') {
      if (control.hasError('pattern')) {
        return 'El RFC debe tener un formato válido (ejemplo: XAXX010101000 para personas físicas o XAXX010101000 para personas morales)';
      }
    }

    if (controlName === 'codigoPostal') {
      if (control.hasError('pattern')) {
        return 'El código postal debe contener exactamente 5 dígitos numéricos';
      }
    }

    if (controlName === 'regimenFiscal') {
      if (control.hasError('required')) {
        return 'Debe seleccionar un régimen fiscal';
      }
    }

    return '';
  }

  toggleQRScanner() {
    this.showQRScanner = !this.showQRScanner
  }

  extractValue(data: BehaviorSubject<ScannerQRCodeResult[]>): void {
    data.subscribe((results) => {
      const qrResult = results.find((result) => result.value)
      this.qrValue = qrResult ? qrResult.value : null

      if (this.qrValue) {
        // Verificar si el QR contiene un RFC (último guion bajo "_")
        const rfcMatch = this.qrValue.match(/_(\w+)$/)
        const rfc = rfcMatch ? rfcMatch[1] : null

        if (rfc) {
          console.log('RFC extraído:', rfc)
          this.signupForm.patchValue({ rfc })
          
          // Determinar si es persona moral (RFC de 12 caracteres)
          this.isPersonaMoral = rfc.length === 12

          // Obtener datos adicionales del SAT
          this.qrService.getDataSat(this.qrValue).subscribe(
            (res: any) => {
              const regimenFiscalCode = res['Regimenes']?.[0]?.['RegimenFiscal']?.['code']
              const regimenFiscalLabel = this.regimenesFiscales.find(
                (regimen) => regimen.value === regimenFiscalCode
              )?.label || 'Régimen no válido'
              
              this.signupForm.patchValue({
                codigoPostal: res['CP'],
                regimenFiscal: regimenFiscalCode
              })

              // Mostrar mensaje de éxito con los datos cargados
              this.toastr.success(
                `Datos fiscales cargados correctamente:
                RFC: ${rfc}
                Código Postal: ${res['CP']}
                Régimen Fiscal: ${regimenFiscalLabel}`,
                '¡Éxito!'
              )
              
              // Cerrar el escáner después de cargar los datos
              this.showQRScanner = false
            },
            (error) => {
              console.error('Error al obtener datos del SAT:', error)
              this.toastr.error(
                'No se pudieron obtener los datos fiscales del SAT. Por favor, intenta nuevamente o ingresa los datos manualmente.',
                'Error'
              )
            }
          )
        } else {
          this.toastr.error(
            'El código QR no contiene un RFC válido. Por favor, asegúrate de escanear el QR de tu constancia fiscal.',
            'Error'
          )
        }
      }
    })
  }

  nextStep() {
    if (this.currentStep === 1) {
      // Validar campos del paso 1
      const step1Controls = ['name', 'email', 'password', 'confirmpwd'];
      const isValid = step1Controls.every(control => this.signupForm.get(control)?.valid);
      
      if (isValid) {
        this.currentStep = 2;
      } else {
        this.submitted = true;
        this.toastr.error('Por favor, completa todos los campos correctamente', 'Error de validación');
        step1Controls.forEach(control => {
          const formControl = this.signupForm.get(control);
          if (formControl?.invalid) {
            formControl.markAsTouched();
          }
        });
      }
    }
  }

  previousStep() {
    this.currentStep = 1
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
