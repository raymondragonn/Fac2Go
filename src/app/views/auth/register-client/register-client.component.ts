import { AuthService } from '@/app/services/auth.service'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
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

@Component({
  selector: 'app-register-client',
  imports: [FormsModule, ReactiveFormsModule, CommonModule,NgbAlertModule],
  templateUrl: './register-client.component.html',
  styles: ``
})
export class RegisterClientComponent {
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  showAlert: boolean = false

  public fb = inject(UntypedFormBuilder)

  constructor(private serviceAuth: AuthService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        rfc: ['', [Validators.required]],
        idcif: ['', [Validators.required]],
      }
    )
  }

  changetype() {
    this.fieldTextType = !this.fieldTextType
  }

  get form() {
    return this.signupForm.controls
  }

  crearLinkSAT(rfc:string, idcif: string) {
    return `https://sat-constancia-fiscal-api.onrender.com/sat/csf/${rfc}/${idcif}`
  }

  onSubmit() {
    this.submitted = true
    if(this.signupForm.valid){
      console.log("Formulario Valido");
      const link = this.crearLinkSAT(this.signupForm.value.rfc, this.signupForm.value.idcif);
      window.open(link, '_blank');
    }
  }
}
