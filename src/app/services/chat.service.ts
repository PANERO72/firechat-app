import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user => {
      console.log('Estado del usuario:', user);
      if (!user) {
        // Swal.fire({
        //   title: '¡Antención', text: 'No exite e lUsuario', icon: 'warning'
        // })
        return;
      }else{
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        Swal.fire({
          title: '¡Muy bien!', text: 'El Usuario ' + user.displayName + ' inció sesión.', icon: 'success'
        });
      }
    });
  }

  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(map((mensajes: Mensaje[]) => {
      console.log(mensajes);

      this.chats = [];

      for( let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }

      return this.chats;
    }));
    
  }

  agregarMensaje(texto: string){
    let mensaje: Mensaje = {
      nombre: 'Demo', mensaje: texto, fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);
  }
}
