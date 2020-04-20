export interface iPostPlaylistCreate {
  name: string;
  privacy: 1 | 10;
}

export interface iPid {
  pid: string;
}

export interface iUpdatePlaylistDes extends iPid {
  description: string;
}

export interface iGetPlaylistDetail extends iPid {
  subNum?: number;
}

export interface iUpdatePlaylistName extends iPid {
  name: string;
}

export interface iPostPlaylistSub extends iPid {
  actionType: 'subscribe' | 'unsubscribe';
}

export interface iGetPlaylistSubcribers extends iPid, iPageParams {}

export interface iPageParams {
  page?: number;
  pageSize?: number;
}
