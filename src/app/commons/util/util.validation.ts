import { Injectable } from '@angular/core';
import { UtilFormating } from './util.formating';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
@Injectable()
export class UtilValidation {
  constructor(public utilFormating: UtilFormating) {}

  static MatchPassword(AC: AbstractControl) {
    const password = AC.root.get('password').value; // to get value in input tag
    const confirmPassword = AC.root.get('repassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.root.get('repassword').setErrors({ matchPassword: true });
    } else {
      return null;
    }
  }

  public fechaValida = (control: FormControl): { [s: string]: boolean } => {
    moment().locale('es');
    if (control.value !== '') {
      if (!moment(control.value, 'DD/MM/YYYY', true).isValid()) {
        return {
          fechaValida: true
        };
      }
    }
    return null;
  };
  public fechaHoraValida = (control: FormControl): { [s: string]: boolean } => {
    moment().locale('es');
    if (control.value !== '') {
      if (!moment(control.value, 'DD/MM/YYYY HH:mm').isValid()) {
        return {
          fechaValida: true
        };
      }
    }
    return null;
  };
  public horaValida = (control: FormControl): { [s: string]: boolean } => {
    moment().locale('es');
    if (!moment(control.value, 'HH:mm', true).isValid()) {
      return {
        horaValida: true
      };
    }
    return null;
  };

  public porcentajeValido = (control: FormControl): { [s: string]: boolean } => {
    const valor: any = control.value;
    if (valor !== null) {
      if (!/^\d+$/.test(valor)) {
        return {
          porcentajeValido: true
        };
      }
      if (Number(valor) > 0 && Number(valor) > 100) {
        return {
          porcentajeValido: true
        };
      }
    }
  };

  public emailValido = (control: FormControl): { [s: string]: boolean } => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
      return {
        emailValido: true
      };
    }
  };
  public celularValido = (control: FormControl): { [s: string]: boolean } => {
    if (!/^\+?56(\s?)(0?9)(\s?)[98765]\d{7}$/.test(control.value)) {
      return {
        celularValido: true
      };
    }
  };

  public rutValido = (control: FormControl): { [s: string]: boolean } => {
    let rut = <string>control.value;
    // console.log(rut);
    if (rut === null || rut === undefined || rut === '') {
      return null;
    }
    // Despejar Puntos
    let valor = this.utilFormating.quitarPuntos(rut);
    // console.log("valor", valor);
    // Despejar Guión
    valor = valor.replace('-', '');
    // console.log("valor", valor);
    // Aislar Cuerpo y Dígito Verificador
    const cuerpo = valor.slice(0, -1);
    // console.log("cuerpo", cuerpo);
    let dv = valor.slice(-1).toUpperCase();
    // Formatear RUN
    rut = cuerpo + '-' + dv;
    // console.log("rut", rut);
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if (cuerpo.length < 7) {
      return { rutValido: true };
    }
    // Calcular Dígito Verificador
    let suma = 0;
    let multiplo = 2;
    // Para cada dígito del Cuerpo
    for (let i = 1; i <= cuerpo.length; i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      const index = multiplo * Number(valor.charAt(cuerpo.length - i));
      // Sumar al Contador General
      suma = suma + index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    const dvEsperado: string = String(11 - (suma % 11));
    // Casos Especiales (0 y K)
    dv = dv === 'K' ? '10' : dv;
    dv = dv === '0' ? '11' : dv;

    // console.log(dvEsperado, dv);
    if (dvEsperado !== dv) {
      return { rutValido: true };
    }
  };
  public validateDate = (control: FormControl): { [s: string]: boolean } => {
    if (control.value !== '') {
      if (!moment(control.value, 'DD/MM/YYYY', true).isValid()) {
        return {
          invalidDate: true
        };
      }
    }
    return null;
  };

  public invalidEmail = (control: FormControl): { [s: string]: boolean } => {
    if (control.value === '') {
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)) {
      return {
        invalidEmail: true
      };
    }
  };

  setFormForValidate(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
