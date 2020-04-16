import { Component, OnInit } from '@angular/core';
import { ProductoModel, ProductoFilter } from 'src/app/commons/models/producto.model';
import { SearchPagination } from 'src/app/commons/interfaces/search-pagination';
import { ProductoService } from 'src/app/commons/services/producto.service';
import { UtilAlert } from 'src/app/commons/util/util-alert';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public listadoProductos = new Array<ProductoModel>();

  private searchPagination: SearchPagination<ProductoFilter>;
  private productoFilter: ProductoFilter;

  public page = 1;
  public pageSize = 10;
  public totalElements = 0;

  public buscador = '';

  constructor(
    private productoService: ProductoService,
    private alert: UtilAlert,
  ) { }

  ngOnInit() {
    this.listarProductos();
  }

  listarProductos() {
    this.productoFilter = {
      query: this.buscador,
      categoriasId: null
    }

    this.searchPagination = {
      page: this.page,
      records: this.pageSize,
      seek: this.productoFilter,
    }

    this.productoService.findAllPaginatedWithFilters(this.searchPagination).subscribe(result => {
      if (!result.error) {
        this.listadoProductos = result.resultado.content;
        this.totalElements = result.resultado.totalElements;
      } else {
        this.alert.errorSwal(result.mensaje);
      }
    });
  }

}
