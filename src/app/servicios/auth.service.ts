import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:5050';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(body: any){
    return this.http.post(`${API_URL}/register`, body);
  }

  LogInUser(body: any){
    return this.http.post(`${API_URL}/generate-token`, body);
  }

}
