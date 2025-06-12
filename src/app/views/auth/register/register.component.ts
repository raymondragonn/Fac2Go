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

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)
  public router = inject(Router)
  public toastr = inject(ToastrService)

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpwd: ['', [Validators.required]],
    }, {
      validator: this.mustMatch('password', 'confirmpwd')
    })
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

  changetype() {
    this.fieldTextType = !this.fieldTextType
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
            this.toastr.success('Administrador registrado exitosamente, redirigiendo al login...', '¡Éxito!');
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
