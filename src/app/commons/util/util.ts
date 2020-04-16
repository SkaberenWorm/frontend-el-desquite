import { FormGroup } from '@angular/forms';

export class Util {
  public static obtenerMensajes(mensajes: String[]) {
    let msg = '';
    if (!Array.isArray(mensajes)) {
      return mensajes;
    }
    if (mensajes == null) {
      msg = 'Error desconocido';
      return msg;
    }
    for (let i = 0; i < mensajes.length; i++) {
      msg += mensajes[i] + '\n';
    }
    if (msg === '') {
      msg = 'Error desconocido';
      return msg;
    }
    return msg;
  }
  public static formatBytes(a, b?) {
    if (0 === a) {
      return '0 Bytes';
    }
    const c = 1024;
    const d = b || 2;
    const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
  }
  public static getDvFromRutString(rut: string): string {
    const rutStr = rut.replace(/\./g, '').replace(/\./g, '');
    return rutStr.substr(rutStr.length - 1, rutStr.length);
  }

  public static getRutFromRutString(rut: string): number {
    let rutStr = rut.replace(/\./g, '');
    rutStr = rutStr.replace(/\-/g, '');
    return Number(rutStr.substr(0, rutStr.length - 1));
  }

  public static setFormForValidate(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      console.log(field);

      const control = form.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
