import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  public items: any;

  constructor(private http: Http) {
    this.items = [
      { title: 'one' },
      { title: 'two' },
      { title: 'three' },
      { title: 'four' },
      { title: 'five' },
      { title: 'six' }];
  }

  filterItems(searchTerm) {
    return this.items.filter((item) => {
    return item.title.toLowerCase().indexOf(
      searchTerm.toLowerCase()) > -1;
  });
}
}
