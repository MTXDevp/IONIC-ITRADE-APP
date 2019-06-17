import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  public empresas: any;

  constructor(private http: HttpClient) {}

  obtenerEmpresas(valor){
   this.empresas = valor;
  }

  filterItems(searchTerm) {
    return this.empresas.filter((item) => {
      return item.nombre.toUpperCase().indexOf(
        searchTerm.toUpperCase()) > -1;
    });
  }
}
