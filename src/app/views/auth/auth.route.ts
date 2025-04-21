import { Route } from '@angular/router'
import { LockScreenComponent } from './lock-screen/lock-screen.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { RecoverPwComponent } from './recover-pw/recover-pw.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'log-in',
    component: LoginComponent,
    data: { title: 'Inicio Sesión' },
  },
  {
    path: 'register',
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
]
