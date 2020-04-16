import Inputmask from 'inputmask';
import { Injectable } from '@angular/core';

@Injectable()
 export class UtilFormating {

  public rutSinDv(rut: string) {
    
    let solo_rut = rut.replace('-', '');
    solo_rut = this.quitarPuntos(solo_rut);
    solo_rut = solo_rut.substring(0, solo_rut.length - 1);
    return solo_rut;
  }
  public quitarPuntos(rut: string): string {
    return rut.replace(/\./g, '');
  }
 }
