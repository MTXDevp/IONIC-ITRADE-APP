import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {

  public empresaBuscar: string;
  public listaEmpresas = [
    {
      nombre: 'one'
    },
    {
      nombre: 'two'
    },
    {
      nombre: 'three'
    },
    {
      nombre: 'four'
    },
    {
      nombre: 'five'
    },
    {
      nombre: 'six'
    }]

  constructor(public router: Router) { }

  ngOnInit() { }

  irInicio() {
    this.router.navigate(['/home']);
  }

  masInfo(item) {
    this.router.navigate(['/info', item]);
  }
}
