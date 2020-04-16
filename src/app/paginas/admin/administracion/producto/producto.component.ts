import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class ProductoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
