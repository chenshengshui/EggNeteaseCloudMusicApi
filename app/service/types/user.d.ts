export interface iDeleteCloudMusic {
  ids: string[];
}

export interface iGetCloudMusicsInfo {
  ids: string[];
}

export interface iGetUserEvent extends iUserId {
  lasttime: number;
  limit: number;
}

export interface iGetUserFollows extends iUserId, iPageParams {}

export interface iGetUserPlayRecord extends iUserId {
  type: number;
}

export interface iUserInfo {
  birthday: string;
  city: string;
  gender: string;
  nickname: string;
  province: string;
  signature: string;
}

export interface iUserId {
  uid: string;
}

export interface iPageParams {
  offset?: number;
  limit?: number;
}
