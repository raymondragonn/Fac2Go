import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
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
import { AuthenticationService } from '@/app/core/service/auth.service'

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule,NgbAlertModule],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent implements OnInit {
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  showAlert: boolean = false
  showPassword: boolean = false
  showConfirmPassword: boolean = false

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)
  public router = inject(Router)
  public toastr = inject(ToastrService)

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
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

  get form() {
    return this.signupForm.controls
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

    return '';
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

  changetype() {
    this.fieldTextType = !this.fieldTextType
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.submitted = true
    if (this.signupForm.valid) {
      let admin = {
        nombre: this.signupForm.value.name,
        correo: this.signupForm.value.email,
        contraseña: this.signupForm.value.password,
        rol: 'admin'
      }
      
      this.authService.registerAdmin(admin).subscribe(
        (response: any) => {
          console.log('Registro exitoso:', response);
          if(response.message === 'Administrador registrado exitosamente'){
            this.toastr.success('Administrador registrado exitosamente...', '¡Éxito!');
            setTimeout(() => {
              this.router.navigate(['/auth/login-admin']);
            }, 2000);
          } else {
            this.toastr.error('Error al registrar el administrador')
          }
        },
        (error) => {
          console.error('Error en el registro:', error);
          this.toastr.error('Error al registrar el administrador')
        }
      )
    } else {
      this.toastr.error('Por favor, completa todos los campos correctamente', 'Error de validación')
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key)
        if (control?.invalid) {
          control.markAsTouched()
        }
      })
    }
  }
}
