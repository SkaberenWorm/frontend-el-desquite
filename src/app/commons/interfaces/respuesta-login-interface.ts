export interface RespuestaLogin {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  expireation_date: number;
  jti: string;
}

