import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilAlert {
  errorSwal(mensaje: string) {
    Swal.fire({
      title: 'Error',
      type: 'error',
      text: mensaje
    });
  }

  warningSwal(mensaje: string) {
    Swal.fire({
      type: 'warning',
      text: mensaje
    });
  }

  successSwal(mensaje: string) {
    Swal.fire({
      title: 'Hecho!',
      type: 'success',
      text: mensaje
    });
  }
}
