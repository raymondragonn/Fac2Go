import { Component, inject } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-recover-pw',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, NgbAlertModule, CommonModule],
  templateUrl: './recover-pw.component.html',
  styles: ``
})
export class RecoverPwComponent {
  recoverForm: UntypedFormGroup
  submitted = false

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)
  public router = inject(Router)
  public toastr = inject(ToastrService)

  constructor() {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get form() {
    return this.recoverForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.recoverForm.valid) {
      this.store.dispatch({ type: '[Auth] Recover Password', payload: this.recoverForm.value })
      this.toastr.success('Se han enviado las instrucciones a tu correo', '¡Revisa tu bandeja de entrada!')
    } else {
      this.toastr.error('Por favor, ingresa un correo electrónico válido', 'Error de validación')
      Object.keys(this.recoverForm.controls).forEach(key => {
        const control = this.recoverForm.get(key)
        if (control?.invalid) {
          control.markAsTouched()
        }
      })
    }
  }
}
