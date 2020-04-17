export interface iDeleteCloudMusic {
  ids: string[];
}

export interface iGetCloudMusicsInfo {
  ids: string[];
}

export interface iGetUserEvent extends iUserId {
  lasttime: number;
  pageSize: number;
}

export interface iGetUserFollows extends iUserId, iPageParams {}

export interface iUserId {
  uid: string;
}

export interface iPageParams {
  page?: number;
  pageSize?: number;
}
