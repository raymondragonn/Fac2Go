import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

 

  constructor(private http:HttpClient) {

  }

  facturarCDFI(data: any){
    return this.http.post(`${API_URL}/facturaCFDI`, {data}, { responseType: 'text' }).pipe(
      delay(5000)
    );
  }

  genPDF(data:any){
    return this.http.post(`${API_URL}/genPDF`, {data}, { responseType: 'text' }).pipe(
      delay(10000)
    );
  }


  genPDFUUID(data:any){
    return this.http.post(`${API_URL}/genPDFUUID`,{data} , { responseType: 'text' }).pipe(
      delay(30000)
    );
  }

  SendEmail(){
    return this.http.post(`${API_URL}/sendFacEmail`,{} , { responseType: 'text' });
  }

}
