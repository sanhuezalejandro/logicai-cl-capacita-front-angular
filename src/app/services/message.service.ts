import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, CreateMessageDto } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // URL absoluta a la API en producción
  private apiUrl = 'https://api-capacita.logicaisolutions.com/api/messages';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  createMessage(message: CreateMessageDto): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }

  getMessage(id: number): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}/${id}`);
  }
}

