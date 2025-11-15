import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from './services/message.service';
import { Message, CreateMessageDto } from './models/message.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Hola Mundo - Angular + NestJS');
  messages = signal<Message[]>([]);
  newMessage: CreateMessageDto = {
    content: '',
    author: ''
  };
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private messageService: MessageService) {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading.set(true);
    this.error.set(null);
    this.messageService.getMessages().subscribe({
      next: (data) => {
        this.messages.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar mensajes: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  createMessage(): void {
    if (!this.newMessage.content || !this.newMessage.author) {
      this.error.set('Por favor completa todos los campos');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.messageService.createMessage(this.newMessage).subscribe({
      next: () => {
        this.newMessage = { content: '', author: '' };
        this.loadMessages();
      },
      error: (err) => {
        this.error.set('Error al crear mensaje: ' + err.message);
        this.loading.set(false);
      }
    });
  }

  deleteMessage(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este mensaje?')) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.loadMessages();
      },
      error: (err) => {
        this.error.set('Error al eliminar mensaje: ' + err.message);
        this.loading.set(false);
      }
    });
  }
}
