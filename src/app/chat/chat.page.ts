import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Message {
  sender: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  userName: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el nombre del usuario de los parámetros de navegación
    this.route.queryParams.subscribe(params => {
      this.userName = params['username'] || localStorage.getItem('username') || 'Usuario';
    });

    // Cargar mensajes del chat desde localStorage
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      this.messages = JSON.parse(storedMessages);
    } else {
      // Mensaje inicial de la IA
      this.messages.push({
        sender: 'IA',
        text: 'Hola, ¿en qué puedo ayudarte hoy? Estoy aquí para apoyarte con tus tareas universitarias o tu bienestar mental.'
      });
    }
  }

  sendMessage() {
    if (this.newMessage.trim().length > 0) {
      // Agregar el mensaje del usuario a la lista de mensajes
      this.messages.push({
        sender: this.userName,
        text: this.newMessage
      });

      // Guardar mensajes en localStorage
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));

      // Limpiar el campo de entrada
      this.newMessage = '';

      // Respuesta automática de la IA
      setTimeout(() => {
        this.messages.push({
          sender: 'IA',
          text: 'Gracias por tu mensaje. Estoy aquí para ayudarte.'
        });

        // Guardar mensajes en localStorage
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
      }, 1000);
    }
  }
}