import { Route } from '@angular/router'
import { LockScreenComponent } from './lock-screen/lock-screen.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { RecoverPwComponent } from './recover-pw/recover-pw.component'
import { LoginUserComponent } from './login-user/login-user.component'
import { RegisterUserComponent } from './register-user/register-user.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'login-admin',
    component: LoginComponent,
    data: { title: 'Inicio Sesión' },
  },
  {
    path: 'register-admin',
    component: RegisterComponent,
    data: { title: 'Registro' },
  },
  {
    path: 'recover-pw',
    component: RecoverPwComponent,
    data: { title: 'Recuperar Contraseña' },
  },
  {
    path: 'lock-screen',
    component: LockScreenComponent,
    data: { title: 'Bloqueo Sesión' },
  },
  {
    path: 'login-user',
    component: LoginUserComponent,
    data: { title: 'Inicio Sesión de Usuario'}
  },
  {
    path: 'register-user',
    component: RegisterUserComponent,
    data: {title: 'Registro de Usuario'}
  }
]
