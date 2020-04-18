export interface iLoginByCellPhone {
  phone: string;
  password: string;
  countrycode?: string;
  rememberLogin?: boolean;
}

export interface iPostInitProfile {
  nickname: string;
}

export interface iPostLoginCaptchaSend {
  ctcode: string;
  cellphone: string;
}
export interface iPostLoginCaptchaVerify extends iPostLoginCaptchaSend {
  captcha: string;
}
