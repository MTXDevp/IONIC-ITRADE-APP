import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  public empresas: any;
  public siglas: any;

  constructor(private http: Http) {
    this.empresas = [
      {
        id: '0',
        nombre: 'MICROSOFT'
      },
      {
        id: '1',
        nombre: 'GOOGLE'
      },
      {
        id: '2',
        nombre: 'AMAZON'
      },
      {
        id: '3',
        nombre: 'APPLE'
      },
      {
        id: '4',
        nombre: 'AMD'
      },
      {
        id: '5',
        nombre: 'INTEL'
      },
      {
        id: '6',
        nombre: 'QUALCOM'
      },
      {
        id: '7',
        nombre: 'DELL'
      },
      {
        id: '8',
        nombre: 'FACEBOOK'
      },
      {
        id: '9',
        nombre: 'TESLA'
      }];

    this.siglas = [
      {
        id: '0',
        nombre: 'MSFT'
      },
      {
        id: '1',
        nombre: 'GOOGL'
      },
      {
        id: '2',
        nombre: 'AMZN'
      },
      {
        id: '3',
        nombre: 'AAPL'
      },
      {
        id: '4',
        nombre: 'AMD'
      },
      {
        id: '5',
        nombre: 'INTC'
      },
      {
        id: '6',
        nombre: 'QCOM'
      },
      {
        id: '7',
        nombre: 'DELL'
      },
      {
        id: '8',
        nombre: 'FB'
      },
      {
        id: '9',
        nombre: 'TSLA'
      }];
  }

  formateoEmpresa(empresa) {
    let indice: string;
    this.empresas.forEach(element => {
      if (element.nombre == empresa) {
        indice = element.id;
      }
    });
    return this.siglas[indice].nombre;
  }

  filterItems(searchTerm) {
    return this.empresas.filter((item) => {
      return item.nombre.toUpperCase().indexOf(
        searchTerm.toUpperCase()) > -1;
    });
  }
}
