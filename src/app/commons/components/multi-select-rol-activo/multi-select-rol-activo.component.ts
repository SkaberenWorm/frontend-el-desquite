import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

import { RolModel } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-multi-select-rol-activo',
  templateUrl: './multi-select-rol-activo.component.html',
  styles: [
  ]
})
export class MultiSelectRolActivoComponent implements OnInit {


  @Input() roles = new Array<RolModel>();
  public rolesId = new Array<number>();

  @Output() rolesSeleccionados = new EventEmitter<Array<RolModel>>();


  defaultModel: number[];
  searchSettings: any;


  public selectOptions: Array<RolModel> = [];

  constructor(
    private appService: AppService,
    private rolService: RolService,
    private toastr: ToastrService,
  ) {
    this.searchSettings = {
      enableSearch: true,
      pullRight: this.appService.isRTL,
      buttonClasses: 'btn btn-default btn-sm',
    };
  }

  ngOnInit(): void {
    if (this.roles != null && this.roles != undefined) {
      this.roles.forEach(rol => {
        this.rolesId.push(rol.id);
      });
    }
    this.rolService.findAllActivos().subscribe(result => {
      if (!result.error) {
        this.selectOptions = result.resultado;
      } else {
        this.toastr.error(result.mensaje);
      }
    });
  }

  changeRol() {
    const _rolesSeleccionados = new Array<RolModel>();
    this.selectOptions.forEach(rol => {
      this.rolesId.forEach(rolId => {
        if (rolId == rol.id) {
          _rolesSeleccionados.push(rol);
        }
      });
    });
    this.rolesSeleccionados.emit(_rolesSeleccionados);
  }

}
