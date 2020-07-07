import { Component, OnInit } from '@angular/core';
import { ChatService } from "./../../services/chat.service";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string = '';

  elemento: any;

  constructor(public chatServices: ChatService) {
    this.chatServices.cargarMensajes().subscribe( () => {
      setTimeout( () => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
   }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje(){
    console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this.chatServices.agregarMensaje(this.mensaje).then(()=> {
      this.mensaje = "";
    }).catch((err) => {
      alert('Error al enviar el mensaje:' + err);
    });
  }

}
