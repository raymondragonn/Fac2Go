import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactTicket {
  subject: string;
  queryType: string;
  description: string;
  attachments?: File[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/support/tickets`;

  constructor(private http: HttpClient) { }

  submitTicket(ticket: ContactTicket): Observable<any> {
    const formData = new FormData();
    formData.append('subject', ticket.subject);
    formData.append('queryType', ticket.queryType);
    formData.append('description', ticket.description);
    
    if (ticket.attachments) {
      ticket.attachments.forEach((file, index) => {
        formData.append(`attachment${index}`, file);
      });
    }

    return this.http.post(this.apiUrl, formData);
  }
} 