import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { Observable } from 'rxjs'

import { CookieService } from 'ngx-cookie-service'
import { User } from '../helpers/fake-backend'

const API_URL = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: User | null = null

  public readonly authSessionKey = '_APPROX_AUTH_SESSION_KEY_'
  private cookieService = inject(CookieService)

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = this.session;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  login(correo: string , contraseña: string) {
    return this.http.post<User>(`${API_URL}/usuarios/login`, { correo, contraseña }, { headers: this.getHeaders() }).pipe(
      map((user) => {
        return user
      })
    )
  }

  getidUser(){
    return this.http.get(`${API_URL}/userid`, )
  }

  loginAdmin(correo: string, contraseña: string) {
    return this.http.post<User>(`${API_URL}/admin/login`, { correo, contraseña }, { headers: this.getHeaders() }).pipe(
      map((user: any) => {
        if (user.token) {
          this.saveSession(user.token);
          this.user = user;
        }
        return user;
      })
    )
  }
  saveFacturaDatabase(factura: any) {
    return this.http.post(`${API_URL}/factu`, factura )
  }

  getAllFacturas() {
     return this.http.get(`${API_URL}/factu/all`);
  }

  getFacturas(correo: string) {
  return this.http.get(`${API_URL}/factu/usuario`, {
    params: { correo }
  });

  

  
  

  
}

  

  // getClientes() {
  //   return this.http.get(`${API_URL}/clientes`);
  // }

  loginUser(correo: string, contraseña: string) {
    return this.http.post<User>(`${API_URL}/usuarios/login`, { correo, contraseña }).pipe(
      map((user: any) => {
        if (user.token) {
          this.saveSession(user.token);
          this.user = user;
        }
        return user;
      })
    )
  }

  saveSession(token: string): void {
    this.cookieService.set(this.authSessionKey, token, { 
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000), // 1 día
      path: '/',
      secure: true,
      sameSite: 'Strict'
    });
  }

  removeSession(): void {
    this.cookieService.delete(this.authSessionKey)
  }
  
  get session(): string {
    return this.cookieService.get(this.authSessionKey)
  }

  logout(): void {
    // remove user from cookie to log user out
    this.removeSession()
    this.user = null
  }

  registerAdmin(admin: any) {
    return this.http.post(`${API_URL}/admin/register`, admin, { headers: this.getHeaders() });
  }

  registerUser(usuario: any) {
    return this.http.post(`${API_URL}/usuarios`, usuario);
  }

  getClientes() {
    return this.http.get(`${API_URL}/clientes`, { headers: this.getHeaders() });
  }

  getClientesBycorreo(correo: any) {
  return this.http.get(`${API_URL}/clientes/userbycorreo`, {
    params: { correo },
   
  });
}

  newCliente(cliente: any) {
    return this.http.post(`${API_URL}/clientes`, cliente);
  }

  deleteCliente(id: string) {
    return this.http.delete(`${API_URL}/clientes/${id}`, { headers: this.getHeaders() });
  }

  getClienteById(id: any){
    return this.http.get(`${API_URL}/clientes/${id}`);
  }

  getUsuarios() {
    return this.http.get(`${API_URL}/usuarios`, { headers: this.getHeaders() });
  }

  facturacionInterna(form: any){
    return this.http.post(`${API_URL}/factu`, form);
  }

  getUseridByCorreo(correo: string) {
    return this.http.get(`${API_URL}/usuarios/idByCorreo`, {
      params: { correo }
  });
}

  getCurrentUser() {
    const token = this.session;
    if (!token) {
      console.log('No hay token en la sesión');
      return new Observable(subscriber => {
        subscriber.error(new Error('No hay sesión activa'));
      });
    }

    return this.http.get(`${API_URL}/usuarios/current`, { headers: this.getHeaders() }).pipe(
      map((response: any) => {
        if (response.status === 'success') {
          return response;
        }
        throw new Error(response.message || 'Error al obtener usuario actual');
      }),
      catchError(error => {
        console.error('Error al obtener usuario actual:', error);
        return throwError(() => new Error(error.error?.message || 'Error al obtener usuario actual'));
      })
    );
  }

  getCurrentAdmin() {
    const token = this.session;
    if (!token) {
      console.log('No hay token en la sesión para administrador');
      return new Observable(subscriber => {
        subscriber.error(new Error('No hay sesión activa'));
      });
    }

    return this.http.get(`${API_URL}/admin/current`, { headers: this.getHeaders() }).pipe(
      map((response: any) => {
        console.log('Respuesta getCurrentAdmin:', response);
        if (response.status === 'success') {
          return {
            correo: response.correo,
            nombre: response.nombre
          };
        }
        throw new Error(response.message || 'Error al obtener administrador actual');
      }),
      catchError(error => {
        console.error('Error al obtener administrador actual:', error);
        if (error.status === 401) {
          // Token inválido o expirado
          this.removeSession();
          this.user = null;
        }
        return throwError(() => new Error(error.error?.message || 'Error al obtener administrador actual'));
      })
    );
  }

  deleteUsuario(id: string) {
    return this.http.delete(`${API_URL}/usuarios/${id}`, { headers: this.getHeaders() });
  }

  updateUsuario(id: string, usuario: any) {
    return this.http.put(`${API_URL}/usuarios/${id}`, usuario, { headers: this.getHeaders() });
  }
}