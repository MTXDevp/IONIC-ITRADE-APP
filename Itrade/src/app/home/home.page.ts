import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Querys } from '../servicios/fav.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public editar = true;
  public listItems: string[];
  public msg = null;

  constructor(
    public actionSheetController: ActionSheetController,
    public authService: AuthService,
    private modal: ModalController,
    public router: Router,
    public fav: Querys
  ) { }

  ionViewWillEnter() {
    this.fav.listFavs().then(data => {
      this.listItems = data;
      if (this.listItems.length === 0) {
        this.msg = "No se encuentra ningún 'favorito'."
      }
      else {
        this.msg = null;
      }
    }
    ).catch(err => {
      this.msg = "No se encuentra ningún 'favorito'."
    });
  }

  onRenderItems(event) {
    let draggedItem = this.listItems.splice(event.detail.from, 1)[0];
    this.listItems.splice(event.detail.to, 0, draggedItem)
    event.detail.complete();
  }

  irExplorar() {
    this.router.navigate(['/explorar']);
  }
  onLogOut() {
    this.authService.logout();
  }

  masInfo(item) {
    this.router.navigate(['/info', item]);
  }

  modificarLista(estado: boolean) {
    this.editar = estado;
    if (estado) {
      this.fav.addFavs(this.listItems);
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.onLogOut();
        }
      }]
    });
    await actionSheet.present();
  }
}
