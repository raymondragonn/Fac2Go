import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs/operators';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  public readonly authSessionKey = '_APPROX_AUTH_SESSION_KEY_'
  private cookieService = inject(CookieService)

  constructor(private http:HttpClient) {
    

  }

  private getHeaders(): HttpHeaders {
      const token = this.session;
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With'
      });
    }

  

  facturarCDFI(data: any){
    return this.http.post(`${API_URL}/facturas/facturaCFDI`, {data}).pipe(
      delay(5000)
    );
  }

  get session(): string {
    return this.cookieService.get(this.authSessionKey)
  }

  genPDF(data:any){
    return this.http.post(`${API_URL}/facturas/genPDF`, {data}).pipe(
      delay(10000)
    );
  }


  genPDFUUID(data:any){
    return this.http.post(`${API_URL}/facturas/genPDFUUID`,{data} ).pipe(
      delay(30000)
    );
  }

  SendEmail(){
    return this.http.post(`${API_URL}/facturas/sendFacEmail`,{} , { responseType: 'text' });
  }

}
