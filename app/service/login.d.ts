export interface iLoginByCellPhone {
  phone: string;
  password: string;
  countrycode?: string;
  rememberLogin?: boolean;
}

export interface iPostInitProfile {
  nickname: string;
}
