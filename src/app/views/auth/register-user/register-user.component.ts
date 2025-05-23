import { AuthService } from '@/app/services/auth.service'
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

@Component({
  selector: 'app-register-user',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule,NgbAlertModule],
  templateUrl: './register-user.component.html',
  styles: ``,
})
export class RegisterUserComponent implements OnInit {
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  showAlert: boolean = false

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)
  public router = inject(Router)
  public toastr = inject(ToastrService)

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
      this.store.dispatch({ type: '[Auth] Register', payload: this.signupForm.value })
      this.toastr.success('Registro exitoso', '¡Bienvenido!')
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
