//Importamo la 'auth' de firebase para hacer uso de el
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * Constructor parametrizado.
   * @param AFauth : variable que hace referencia al modulo que importamos.
   */
  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  /**
   * Metodo que usamos para establecer la conexion con la base de datos
   * @param email : hace referencia al correo que introduce el usuario.
   * @param contraseña : hace referencia a la contraseña que introduce el usuario.
   */
  login(email: string, contraseña: string) {
    //Retornamos una promesa con la respuesta del servidor.
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, contraseña).then(usuario => {
        resolve(usuario);
      }).catch(
        error => rejected(error)
      );
    });

  }

  logout() {
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
        const uid = res.user.uid;
        this.db.collection('usuarios').doc(uid).set({
          name: email,
          uid: uid
        });
        resolve(res);
      }).catch(
        error => rejected(error)
      );
    });
  }
}
