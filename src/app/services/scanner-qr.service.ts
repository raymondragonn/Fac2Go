import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = '/sat/csf/qr/?url=';

@Injectable({
  providedIn: 'root'
})
export class ScannerQRService {

  constructor(private http: HttpClient) { }

  // Read
  getDataSat(link: string) {
    // Codificar la URL antes de concatenarla
    const encodedLink = encodeURIComponent(link);
    const fullUrl = `${API_URL}${encodedLink}`;
    return this.http.get(fullUrl);
  }

}
