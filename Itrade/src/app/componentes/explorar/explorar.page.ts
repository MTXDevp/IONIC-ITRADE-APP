import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresasService } from './../../servicios/empresas.service';
import { NavController } from '@ionic/angular';
import { FormControl } from '@angular/forms'
import { debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {

  public searchTerm: string = '';
  public searchControl: FormControl;
  public items: any;
  public searching: any = false;

  constructor(public router: Router, private http: HttpClient, private navCtrl: NavController, private empresasService: EmpresasService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.obtenerEmpresas();
  }

  obtenerEmpresas() {
    return new Promise(resolve => {
      this.http.get('http://127.0.0.1:8000/api/Predictions/list').subscribe(data => {
        resolve(data);
        this.items = data
        this.empresasService.obtenerEmpresas(data);
        this.setFilteredItems();
        this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe(search => {
          this.searching = false;
          this.setFilteredItems();
        })
      }, err => {
        console.log(err);
      });
    });
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItems() {
    this.items = this.empresasService.filterItems(this.searchTerm);
  }

  irInicio() {
    this.router.navigate(['/home']);
  }

  masInfo(item) {
    this.router.navigate(['/info', item]);
  }
}
