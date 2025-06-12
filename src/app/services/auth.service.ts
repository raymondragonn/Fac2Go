// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// const API_URL = 'http://localhost:5050';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private http: HttpClient) { }

//   // Create
//   registerUser(body: any) {
//     return this.http.post(`${API_URL}/register`, body);
//   }

//   // Read
//   getUserById(email: string) {
//     return this.http.get(`${API_URL}/users/${email}`);
//   }

//   getAllUsers() {
//     return this.http.get(`${API_URL}/users`);
//   }

//   // Update
//   updateUser(email: string, body: any) {
//     return this.http.put(`${API_URL}/users/${email}`, body);
//   }

//   // Delete
//   deleteUser(email: string) {
//     return this.http.delete(`${API_URL}/users/${email}`);
//   }

//   logInUser(body: any) {
//     return this.http.post(`${API_URL}/generate-token`, body);
//   }
// }
