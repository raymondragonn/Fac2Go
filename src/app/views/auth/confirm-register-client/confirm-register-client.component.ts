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
  selector: 'app-confirm-register-client',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule,NgbAlertModule],
  templateUrl: './confirm-register-client.component.html',
  styles: ``,
})
export class ConfirmRegisterClientComponent {
  fieldTextType!: boolean
  fieldTextType1!: boolean
  signupForm!: UntypedFormGroup
  submitted: boolean = false
  showAlert: boolean = false

  public fb = inject(UntypedFormBuilder)

  constructor(private serviceAuth: AuthService, private router: Router) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmpwd: ['', [Validators.required]],
        number: [
          '',
          [
            Validators.required,
            Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
          ],
        ],
      },
      { validators: this.validateAreEqual }
    )
  }

  public validateAreEqual(c: AbstractControl): { notSame: boolean } | null {
    return c.value.password === c.value.confirmpwd ? null : { notSame: true }
  }

  changetype() {
    this.fieldTextType = !this.fieldTextType
  }

  get form() {
    return this.signupForm.controls
  }

  onSubmit() {
    this.submitted = true
    if(this.signupForm.valid){
      console.log("Formulario Valido")
      this.serviceAuth.registerUser({username: this.signupForm.value.username, password: this.signupForm.value.password}).subscribe((res => {
        this.signupForm.reset();
        this.showAlert = true
        setTimeout(() => {
          this.showAlert = false;
          this.router.navigate(['']);
        }, 3000);
        
      
      }), (error) => {
        console.log(error);
        
      })
    }


  }
}
