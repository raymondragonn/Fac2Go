import { login } from '@/app/store/authentication/authentication.actions'
import { Component, OnInit, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { AlertsComponent } from '../../ui/alerts/alerts.component'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { AuthenticationService } from '@/app/core/service/auth.service'
import { AuthService } from '@/app/services/auth.service'
import { UserService } from '@/app/services/user.service'; // Importa el servicio
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule,NgbAlertModule,CommonModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup
  submitted: boolean = false
  private token: string = ''
  showAlert: boolean = false

  constructor(
    private authServicePrueba: AuthService,
    private authService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  public fb = inject(UntypedFormBuilder)
  public store = inject(Store)
  public router = inject(Router)

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get formValues() {
    return this.signInForm.controls
  }  

  login() {
    // Acceso directo temporal
    localStorage.setItem('currentUser', JSON.stringify({ email: 'admin@temporal.com', token: 'temp-token' }));
    this.userService.setUserType('admin');
    this.toastr.success('¡Bienvenido al Panel de Administración!', 'Inicio de sesión exitoso');
    this.router.navigate(['/dashboard']);

    /* Código original comentado temporalmente
    this.submitted = true;
    if (this.signInForm.valid) {
      const email = this.formValues['email'].value;
      const password = this.formValues['password'].value;
      this.authService.login(email, password).subscribe(
        (res) => {
          console.log(res);
          const { token, email } = res as { token: string; email: string };
          localStorage.setItem('currentUser', JSON.stringify({ email, token }));

          // Establece el userType como 'admin'
          this.userService.setUserType('admin');

          this.toastr.success('¡Bienvenido al Panel de Administración!', 'Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
          this.showAlert = true;
          this.toastr.error('Credenciales inválidas', 'Error de autenticación');
          setTimeout(() => {
            this.showAlert = false;
          }, 6000);
        }
      );
    } else {
      this.toastr.error('Por favor, completa todos los campos correctamente', 'Error de validación')
      Object.keys(this.signInForm.controls).forEach(key => {
        const control = this.signInForm.get(key)
        if (control?.invalid) {
          control.markAsTouched()
        }
      })
    }
    */
  }
}