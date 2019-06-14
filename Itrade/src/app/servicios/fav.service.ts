//Importamo la 'auth' de firebase para hacer uso de el
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class Querys {

    /**
     * Constructor parametrizado.
     * @param AFauth : variable que hace referencia al modulo que importamos.
     */
    constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

    addFavs(newFavs: string[]) {
        const userId = this.AFauth.auth.currentUser.uid;
        return new Promise((resolve, rejected) => {
            this.db.collection('usuarios').doc(userId).update({
                favs: newFavs
            });
            console.log('registros modificados');
        });
    }

    listFavs() {
        const userId = this.AFauth.auth.currentUser.uid;
        return this.db.collection('usuarios')
            .doc(userId)
            .ref
            .get().then(doc => {
                if (doc.exists) {
                    return doc.data().favs;
                } else {
                    return null;
                }
            }).catch(error => {
                console.log('Error al listar los favoritos', error);
            });
    };
}
