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

@Component({
  selector: 'app-login-user',
  imports: [RouterLink, FormsModule, ReactiveFormsModule,NgbAlertModule,CommonModule],
  templateUrl: './login-user.component.html',
  styles: ``
})
export class LoginUserComponent {
  signInForm!: UntypedFormGroup
  submitted: boolean = false
  private token: string = ''
  showAlert: boolean = false

  constructor(
    private authServicePrueba: AuthService,
    private authService: AuthenticationService,
    private userService: UserService // Inyecta el servicio
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
    
    this.submitted = true;
    if (this.signInForm.valid) {
      const correo = this.formValues['email'].value;
      const contraseña = this.formValues['password'].value;
      this.authService.login(correo, contraseña).subscribe(
        (res) => {
          const { status } = res as { status:string};
          // localStorage.setItem('currentUser', JSON.stringify({ email, token }));
          
          // Establece el userType como 'user'
          if(status == "success"){
            this.userService.setUserType('user');
            this.router.navigate(['/wallet']);

          }else{
            this.showAlert = true;
            setTimeout(() => {
              this.showAlert = false;
            })
          }
          // console.log(status);
        },
        (error) => {
          console.log(error);
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 6000);
        }
      );
    }
  }
}
