import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/commons/models/producto.model';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public listadoProductos = new Array<ProductoModel>();


  public page = 1;
  public pageSize = 10;
  public totalElements = 0;

  public buscador = '';

  constructor(
  ) { }

  ngOnInit() {
    this.listarProductos();
  }

  listarProductos() {

  }


  nuevo() {

  }

  sortData(sort: any) {
    // this.order = sort.active.toString().trim();
    // this.direction = sort.direction.toString().trim();
    // if (sort.direction.toString().trim() == '') {
    //   this.order = 'id';
    //   this.direction = 'desc';
    // }
    // this.listarProductos();
  }

  changePageSize(cantidadRegistros: number) {
    if (cantidadRegistros == 0) {
      cantidadRegistros = this.totalElements;
    }
    this.pageSize = cantidadRegistros;
    this.page = 1;
    this.listarProductos();
  }

}
