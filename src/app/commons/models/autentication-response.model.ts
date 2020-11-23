export class AutentificationResponseModel {
  constructor(public token: string = '',
    public mensaje: string = '',
    public fin: number = 0,
    public error: boolean = false
  ) {

  }
}
