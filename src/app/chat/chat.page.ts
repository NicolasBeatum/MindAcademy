import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userName: string = 'Usuario';
  messages: { sender: string, text: string }[] = [];
  newMessage: string = '';
  chat: any;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
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

    // Inicializar el chat con Google Generative AI
    const genAI = new GoogleGenerativeAI("AIzaSyAWUzUuvg0ht-Uxlxj3xXrF8VXH1cgw-ow");
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'Hello' }],
        },
        {
          role: 'model',
          parts: [{ text: 'Great to meet you. What would you like to know?' }],
        },
      ],
    });
  }

  async sendMessage() {
    if (this.newMessage.trim().length > 0) {
      // Agregar el mensaje del usuario a la lista de mensajes
      this.messages.push({
        sender: this.userName,
        text: this.newMessage
      });

      // Guardar mensajes en localStorage
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));

      // Guardar el mensaje del usuario
      const userMessage = this.newMessage;
      this.newMessage = '';

      try {
        // Llamar a la API de Google Generative AI para obtener una respuesta
        const result = await this.chat.sendMessage(userMessage);

        // Agregar la respuesta de la IA a la lista de mensajes
        this.messages.push({
          sender: 'IA',
          text: result.response.text()
        });

        // Guardar mensajes en localStorage
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
      } catch (error) {
        console.error('Error al obtener respuesta de la API de Google Generative AI:', error);
        this.messages.push({
          sender: 'IA',
          text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo más tarde.'
        });

        // Guardar mensajes en localStorage
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
      }
    }
  }
}